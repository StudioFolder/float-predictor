import Vue from 'vue';

import Router from 'vue-router';

import homePage from 'Pages/HomePage';
import flightSimulator from 'Pages/FlightSimulator';
import visualizationServer from 'Pages/VisualizationServer';
import gui from 'Pages/GUI';

/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
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
    {
      path: '/gui',
      name: 'visualization-server',
      component: gui,
    },
  ],
});

export default router;
