// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'vue-infinite-scroll';
import vbclass from 'vue-body-class';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapCSS);
Vue.use(InfiniteScroll);
Vue.use(vbclass, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
