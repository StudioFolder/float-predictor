/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/pages/HomePage';
import TestInterface from '@/components/visualization/TestInterface';
import Gallery from '@/components/pages/Gallery';
import FlightSimulator from '@/components/pages/FlightSimulator';
import About from '@/components/pages/About';
import Impressum from '@/components/pages/Impressum';

Vue.use(Router);

const scrollBehavior = (to, from) => {
  console.log(to);
  if (from.name === 'FlightSimulator') {
    // animate scroll to top
    window.scrollTo({
      "behavior": "smooth",
      "top": top
    });
  }
};

const router = new Router({
  // mode: 'history',
  scrollBehavior,
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
      meta: {
        bodyClass: 'home',
        position: 'top'
      },
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
      meta: {
        bodyClass: 'about',
        scrollToTop: true,
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


// router.afterEach(() => { // ( to, from, next ) are the optional arguments
// });

export default router;
