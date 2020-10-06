// Import Vue
import Vue from 'vue';
import App from '../components/app.vue';
import routes from './routes.js'
import store from './store'
import Axios from 'axios'

import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

import 'framework7/css/framework7.bundle.css';
import '../css/icons.css';
import '../css/app.scss';

Framework7.use(Framework7Vue);

Vue.prototype.$routes = routes;
Vue.prototype.$http = Axios;

const token = localStorage.getItem('user-token');
if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

