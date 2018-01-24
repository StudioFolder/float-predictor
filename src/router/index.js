import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
  ],
  mode: 'history',
});


router.afterEach(() => { // ( to, from, next ) are the optional arguments
});

export default router;
