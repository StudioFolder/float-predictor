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
  let time = 0;
  // from middle to top -> slide
  if (fromMiddle && toTop) {
    transitionName = 'fade-middle-to-top';
    store.commit('flightSimulator/setFocusedExplorer', 0);
  } else if (fromTop && toMiddle) {
    transitionName = 'top-to-middle';
    // transitionMode = 'out-in';
  } else if (fromMiddle && toBottom) {
    store.commit('flightSimulator/setVisualizationState', 7); // start to move the earth
    // wait a little bit for the earth to move
    time = 0;
    transitionName = 'middle-to-bottom';
    transitionMode = 'out-in';
  } else if (fromTop && toTop) {
    transitionMode = 'in-out';
  } else if (fromBottom && toMiddle) {
    transitionName = 'bottom-to-middle';
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
  setTimeout(() => {
    next();
  }, time); // todo: refactor with event
});

export default router;
