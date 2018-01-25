export default {
  namespaced: true,
  state: {
    flightType: 'planned',
    isActive: false, // are we flying yet?
    explorers: [1, 2, 3, 4, 5, 6, 7, 8],
    activeExplorer: [], // who is flying right now?
    focusedExplorer: 0, // this is for onBoardExperience
  },
  mutations: {
    changeFlightType(state, flightType) {
      state.flightType = flightType;
    },
  },
  getters: {
    isFreeFlight: state => state.flightType === 'free',
    isPlannedFlight: state => state.flightType === 'planned',
    visualMode: state => (state.focusedExplorer === 0 ? 'global' : 'onBoard'),
  },
};
