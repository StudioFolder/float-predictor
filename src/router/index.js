import Vue from 'vue';

import Router from 'vue-router';

import homePage from 'Pages/HomePage';
import flightSimulator from 'Pages/FlightSimulator';
import visualizationServer from 'Pages/VisualizationServer';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage,
    },
    {
      path: '/client/home',
      name: 'home',
      component: homePage,
    },
    {
      path: '/client/flight-simulator',
      name: 'flight-simulator',
      component: flightSimulator,
    },
    {
      path: '/server',
      name: 'visualization-server',
      component: visualizationServer,
    },
  ],
});

export default router;
