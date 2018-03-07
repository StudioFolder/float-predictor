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
        position: 'middle',
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
      name: 'about',
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
      meta: {
        bodyClass: 'gallery',
        position: 'bottom',
      },
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
  const fromBottom = from.matched.some(m => m.meta.position === 'bottom');
  const toTop = to.matched.some(m => m.meta.position === 'top');
  const toBottom = to.matched.some(m => m.meta.position === 'bottom');
  const toMiddle = to.matched.some(m => m.meta.position === 'middle');
  const fromMiddle = from.matched.some(m => m.meta.position === 'middle');

  let transitionName = 'fade';
  let transitionMode = '';

  if (fromMiddle) { // From Middle
    if (toBottom) {
      store.commit('flightSimulator/setVisualizationState', 7); // start to move the earth
      transitionName = 'middle-to-bottom';
      transitionMode = 'out-in';
    } else if (toTop) {
      transitionName = 'fade-middle-to-top';
    }
    store.commit('flightSimulator/setFocusedExplorer', 0);
  } else if (fromTop) { // From Top
    if (toMiddle) {
      transitionName = 'top-to-middle';
    } else if (toBottom) {
      transitionName = 'top-to-bottom';
      store.commit('flightSimulator/setVisualizationState', 7);
    } else {
      transitionMode = 'in-out';
    }
  } else if (fromBottom) { // From Bottom
    if (toTop) {
      transitionName = 'bottom-to-top';
      transitionMode = 'out-in';
      store.commit('flightSimulator/setVisualizationState', 6);
    } else if (fromBottom && toMiddle) {
      transitionName = 'bottom-to-middle';
    }
  }
  // if to middle we need some logic to change the viz state
  if (toMiddle) {
    if (store.state.general.isChoosingDestination) {
      store.commit('flightSimulator/setVisualizationState', 5); // start to move the earth
    } else {
      store.commit('flightSimulator/setVisualizationState', 2);
      store.commit('flightSimulator/setPlaying', true);
    }
  }
  // some overwrites for particular cases
  if (from.name === 'home-page'
    && (to.name === 'flight-simulator' && store.state.general.isChoosingDestination)) {
    transitionName = 'fade-form-from-top';
    transitionMode = '';
  }

  store.commit('general/setTransition', transitionName);
  store.commit('general/setTransitionMode', transitionMode);

  next();
});

export default router;
