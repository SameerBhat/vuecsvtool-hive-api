import Vue from 'vue'
import App from './App.vue'
import axios from "axios";

//Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
export const bus = new Vue();

axios.defaults.baseURL = process.env.VUE_APP_SERVER_BASE_URL;


new Vue({
  render: h => h(App),
}).$mount('#app')
