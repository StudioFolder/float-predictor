import Vue from 'vue';
import store from '@/store/index';
import Router from 'vue-router';
import HomePage from 'Pages/HomePage';
import TestInterface from 'Components/visualization/TestInterface';
import Gallery from 'Pages/Gallery';
import FlightSimulator from 'Pages/FlightSimulator';
import About from 'Pages/About';
import AeroceneExplorer from 'Pages/AeroceneExplorer';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
      meta: {
        bodyClass: 'home no-scroll',
        position: 'top',
      },
    },
    {
      path: '/flight-simulator',
      name: 'flight-simulator',
      component: FlightSimulator,
      meta: {
        bodyClass: 'flight-simulator no-scroll',
        position: 'middle',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        bodyClass: 'about upper-content',
        position: 'top',
      },
    },
    {
      path: '/aerocene-explorer',
      name: 'aerocene-explorer',
      component: AeroceneExplorer,
      meta: {
        bodyClass: 'aerocene-explorer upper-content',
        position: 'top',
      },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
      meta: { bodyClass: 'gallery' },
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
  const toBottom = to.matched.some(m => m.meta.position === 'bottom');
  const toMiddle = to.matched.some(m => m.meta.position === 'middle');
  const fromMiddle = from.matched.some(m => m.meta.position === 'middle');

  let transitionName = 'fade';
  let transitionMode = '';
  // from middle to top -> slide
  if (fromMiddle && toTop) {
    transitionName = 'middle-to-top';
  } else if (fromTop && toMiddle) {
    transitionName = 'top-to-middle';
  } else if (toBottom) {
    transitionName = 'to-bottom';
  } else if (fromTop && toTop) {
    transitionMode = 'out-in';
  }
  // some overwrites for particular cases
  if (from.name === 'home-page' && (to.name === 'flight-simulator' || toTop)) {
    transitionName = 'fade';
    transitionMode = 'out-in';
  }
  if (from.name === 'flight-simulator'
    && store.state.general.isChoosingDestination
    && toTop) {
    transitionName = 'fade-middle-to-top';
    transitionMode = '';
  }

  store.commit('general/setTransition', transitionName);
  store.commit('general/setTransitionMode', transitionMode);
  next();
});

export default router;
