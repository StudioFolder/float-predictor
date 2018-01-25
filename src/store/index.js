import Vuex from 'vuex';
import Vue from 'vue';
import general from './modules/general';
import flightSimulator from './modules/flighSimulator';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    flightSimulator,
  },
  // plugins: [createPersistedState({paths: ['filters', 'visualization']})]
});
