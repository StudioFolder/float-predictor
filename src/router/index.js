import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/pages/HomePage';
import TestInterface from '@/components/visualization/TestInterface';
import Gallery from '@/components/pages/Gallery';
import FlightSimulator from '@/components/pages/FlightSimulator';
import About from '@/components/pages/About';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      meta: { bodyClass: 'home' },
    },
    {
      path: '/flight-simulator',
      name: 'FlightSimulator',
      component: FlightSimulator,
      meta: { bodyClass: 'flight-simulator' },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { bodyClass: 'about' },
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: Gallery,
      meta: { bodyClass: 'gallery' },
    },
    {
      path: '/test',
      name: 'TestInterface',
      component: TestInterface,
    },
  ],
//   mode: 'history',
});


router.afterEach(() => { // ( to, from, next ) are the optional arguments
});

export default router;
