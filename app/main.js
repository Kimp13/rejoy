import Vue from 'nativescript-vue';
import store from './store';
import { SocketIO } from 'nativescript-socketio';

import App from './components/App';

process.env.API_HOSTNAME = 'http://192.168.43.67:8000';

process.socket = new SocketIO(process.env.API_HOSTNAME);
process.socket.connect();

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
  store,
  render: h => h(App)
}).$start();  