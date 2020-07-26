'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

module.exports = () => {
  const strapi = global.strapi;

  let IOinterval = setInterval(() => {
    if (strapi.server !== undefined) {
      clearInterval(IOinterval);
      const io = require('socket.io')(strapi.server);

      io.on('connection', (socket) => {
        console.log(`A new user is connected!`);
        socket.on('auth', data => {
          let user = Object();

          if (data.email || data.username) {
            let query = data.email ? {
              email: data.email
            } : {
              username: data.username
            };

            strapi.query('user', 'users-permissions').findOne(query)
              .then(queryUser => {
                if (queryUser) {
                  const validPassword = strapi.plugins['users-permissions'].services.user.validatePassword(
                    data.password,
                    queryUser.password
                  );

                  if (validPassword) {
                    user = {
                      isAuthenticated: true,
                      isRoot: true,
                      id: queryUser.id
                    }
                  } else {
                    socket.emit('auth', null);
                    return;
                  }
                  socket.emit('auth', user);
                } else {
                  strapi.query('user', 'admin').findOne(query)
                    .then(queryUser => {
                      if (queryUser) {
                        const validPassword = strapi.plugins['users-permissions'].services.user.validatePassword(
                          data.password,
                          queryUser.password
                        );

                        if (validPassword) {
                          user = {
                            isAuthenticated: true,
                            id: queryUser.id
                          }
                        } else {
                          socket.emit('auth', null);
                          return;
                        }
                      } else {
                        socket.emit('auth', null);
                        return;
                      }

                      socket.emit('auth', {
                        jwt: strapi.plugins['users-permissions'].services.jwt.issue({
                          id: user.id,
                        }),
                        user
                      });
                    });
                }
              });
          } else {
            strapi.plugins['users-permissions'].services.jwt.verify(data.jwt)
              .then(userId => {
                userId = userId.id;

                strapi.query('user', 'users-permissions').findOne({id: userId})
                  .then(queryUser => {
                    if (queryUser) {
                      socket.emit('auth', {
                        isAuthenticated: true,
                        id: queryUser.id,
                        isRoot: false
                      });
                    } else {
                      strapi.query('user', 'admin').findOne({id: userId})
                        .then(queryUser => {
                          if (queryUser) {
                            socket.emit('auth', {
                              isAuthenticated: true,
                              id: queryUser.id,
                              isRoot: true
                            });
                          } else {
                            throw new Error();
                          }
                        })
                        .catch(e => {
                          socket.emit('auth', {
                            isAuthenticated: false
                          });
                        });
                    }
                  });
              })
              .catch(e => {
                socket.emit('auth', {
                  isAuthenticated: false
                });
              });
          }
        });

        socket.on('newService', data => {
          strapi.query('service').create({
            name: data.name,
            categoryId: data.categoryId,
            formFields: data.formFields
          })
            .then(data => {
              socket.emit('newService', {
                ok: true
              });
            })
            .catch(e => {
              socket.emit('newService', {
                ok: false
              });
            });
        });

        socket.on('getAskingsCount', () => {
          strapi.query('asking').count().then(count => {
            socket.emit('getAskingsCount', count);
          });
        });

        socket.on('getAskings', data => {
          strapi.query('asking').find({
            _start: data.skip
          })
            .then(data => {
              let readyAskings = 0;

              for (let i = 0; i < data.length; i += 1) {
                strapi.query('service').findOne({
                  id: data[i].serviceId
                })
                  .then(service => {
                    data[i] = {
                      fields: data[i].fields,
                      serviceName: service.name,
                      id: data[i].id
                    }

                    readyAskings += 1;

                    if (readyAskings === data.length) {
                      socket.emit('getAskings', data);
                    }
                  })
                  .catch(e => {
                    console.log(e);
                  });
              }
            });
        });

        socket.on('disconnect', () => {
          console.log('A user is disconnected.');
        });
      });
    }
  }, 400);

};
