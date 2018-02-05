import Vue from 'vue';
import store from '@/store/index';
import Router from 'vue-router';
import HomePage from '@/components/pages/HomePage';
import TestInterface from '@/components/visualization/TestInterface';
import Gallery from '@/components/pages/Gallery';
import FlightSimulator from '@/components/pages/FlightSimulator';
import About from '@/components/pages/About';
import Impressum from '@/components/pages/Impressum';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: {
        bodyClass: 'home upper-content',
        position: 'top',
      },
    },
    {
      path: '/flight-simulator',
      name: 'FlightSimulator',
      component: FlightSimulator,
      meta: {
        bodyClass: 'flight-simulator',
        position: 'middle',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        bodyClass: 'about upper-content',
        scrollToTop: true,
        position: 'top',
      },
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
      meta: { bodyClass: 'gallery' },
    },
    {
      path: '/impressum',
      name: 'Impressum',
      component: Impressum,
      meta: { bodyClass: 'impressum' },
    },
    {
      path: '/test',
      name: 'TestInterface',
      component: TestInterface,
    },
  ],
});


router.beforeEach((to, from, next) => {
  const fromTop = from.matched.some(m => m.meta.position === 'top');
  // const fromBottom = from.matched.some(m => m.meta.position === 'bottom');
  const toTop = to.matched.some(m => m.meta.position === 'top');
  // const toBottom = to.matched.some(m => m.meta.position === 'bottom');
  // const toMiddle = to.matched.some(m => m.meta.position === 'middle');
  // const fromMiddle = from.matched.some(m => m.meta.position === 'middle');

  // from top to top -> fade
  if (fromTop && toTop) {
    store.commit('general/setTransition', 'fade');
  } else {
    store.commit('general/setTransition', 'slide');
  }
  // // from top to middle -> slide
  // if (fromTop && toMiddle) {
  //   store.commit('general/setTransition', 'top-to-middle');
  // }
  // // from middle to top -> slide
  // if (fromMiddle && toTop) {
  //   store.commit('general/setTransition', 'middle-to-top');
  // }
  // // from top to bottom -> slide down
  // if (fromTop && toBottom) {
  //   store.commit('general/setTransition', 'slide-to-bottom');
  // }
  // // from bottom to top -> slide top
  // if (fromBottom && toTop) {
  //   store.commit('general/setTransition', 'slide-to-top');
  // }
  next();
});

export default router;
