// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import VueNativeSock from 'vue-native-websocket';
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScroll from 'vue-infinite-scroll';
import vbclass from 'vue-body-class';
import VueAnalytics from 'vue-analytics';
import SocialSharing from 'vue-social-sharing';
import App from './App';
import router from './router';
import store from './store';

// Vue.use(VueNativeSock, 'ws://localhost:1337', { reconnection: true, format: 'json' });


Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapCSS);
Vue.use(InfiniteScroll);
Vue.use(vbclass, router);
Vue.use(VueAnalytics, {
  id: 'UA-25554902-10',
});
Vue.use(SocialSharing);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
