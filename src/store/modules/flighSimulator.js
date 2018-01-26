import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    flightType: 'planned',
    isActive: false, // are we flying yet?
    explorers: [1, 2, 3, 4, 5, 6, 7, 8],
    activeExplorers: [], // who is flying right now?
    focusedExplorer: 0, // this is for onBoardExperience, if 0 none is focused
  },
  mutations: {
    changeFlightType(state, flightType) {
      state.flightType = flightType;
    },
    startAnimation(state) {
      state.isActive = true;
    },
    activateExplorer(state, explorer) {
      console.log(explorer);
      _.concat(state.activeExplorers, explorer);
    },
  },
  actions: {
    // for async operations, https://vuex.vuejs.org/en/actions.html
  },
  getters: {
    isFreeFlight: state => state.flightType === 'free',
    isPlannedFlight: state => state.flightType === 'planned',
    visualMode: state => (state.focusedExplorer === 0 ? 'global' : 'onBoard'),
  },
};
