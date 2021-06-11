
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../store/index'
import { sync } from 'vuex-router-sync'
import routes from './routes'
import moment from 'moment'

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

import Chat from 'vue-beautiful-chat';

import PrincipalLayout from '../layouts/PrincipalLayout';
import TabsLayout from '../layouts/TabsLayout';


import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css'; //Vuesax styles
Vue.use(Vuesax);



 //Socket io
 export const SocketInstance = socketio('http://localhost:3000', {
  secure: true
});
Vue.use(VueSocketIO, SocketInstance)
Vue.use(Chat)

Vue.use(VueRouter)

Vue.router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build.env.VUE_ROUTER_MODE
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// Sync Vuex and vue-router;
sync(store, Vue.router)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:3050/'

import auth from '@websanova/vue-auth'

Vue.use(auth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  rolesVar: 'role'
})

Vue.component('v-select', vSelect)

Vue.component('PrincipalLayout', PrincipalLayout)

Vue.component('TabsLayout', TabsLayout)



// Moment
Vue.prototype.moment = moment

// Millares
Vue.filter('format-thousands', function (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});


export default Vue.router
