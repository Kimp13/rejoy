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
        socket.on('disconnect', () => {
          console.log('A user is disconnected.');
        });
      });
    }
  }, 400);

};
