import Vue from 'vue';

import Router from 'vue-router';

import homePage from 'Pages/HomePage';
import flightSimulator from 'Pages/FlightSimulator';
import VisualizationServer from 'Pages/VisualizationServer';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
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
      component: VisualizationServer,
    },
  ],
});

export default router;
