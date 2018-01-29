import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    flightType: 'planned',
    isActive: false, // are we flying yet?
    isPlaying: true,
    isSaving: false,
    isLoading: true,
    isWindVisible: true,
    explorers: [1, 2, 3, 4, 5, 6, 7, 8],
    activeExplorers: [], // who is flying right now?
    focusedExplorer: 0, // this is for onBoardExperience, if 0 none is focused
    focusedExplorerSpeed: 0,
    focusedExplorerDistance: 0,
    elapsedDays: 0,
    departure: {
      lat: 52.520645,
      lng: 13.409779,
      city: 'Berlin',
      country: 'Germany',
    },
    destination: {
      lat: 35.652832,
      lng: 139.839478,
      city: 'Tokio',
      country: 'Japan',
    },
    // used for the final recap: e.g.
    // The Aerocene Explorer that left from Milan...arrived within *km in *hours
    // TODO: still to implement. Sync these variables with the viz local variables
    winningExplorerData: {
      departureDate: new Date(),
      minDist: 0,
      minTime: 0,
    },
  },
  mutations: {
    changeFlightType(state, flightType) {
      state.flightType = flightType;
    },
    startAnimation(state) {
      state.isActive = true;
    },
    activateExplorer(state, explorer) {
      // console.log(explorer);
      _.concat(state.activeExplorers, explorer);
    },
    saveImage(state) { // the image will be saved after the next rendering
      state.isSaving = true;
    },
    setPlaying(state, playing) {
      state.isPlaying = playing;
    },
    setWindVisible(state, visible) {
      state.isWindVisible = visible;
    },
    setDestination(state, destination) { // FORMAT: { lat, lng, city, country };
      state.destination = destination;
    },
    setDeparture(state, departure) { // FORMAT: { lat, lng, city, country };
      state.departure = departure;
    },
    setFocusedExplorer(state, explorerId) {
      state.focusedExplorer = explorerId;
    },
    setFocusedExplorerSpeed(state, explorerSpeed) {
      state.focusedExplorerSpeed = explorerSpeed;
    },
    setFocusedExplorerDistance(state, explorerDistance) {
      state.focusedExplorerSpeed = explorerDistance;
    },
    setElapsedDays(state, days) {
      state.elapsedDays = days;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setSaving(state, isSaving) {
      state.isSaving = isSaving;
    },
    setWinningExplorerData(state, data) {
      state.winningExplorerData = data;
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

/*
isPlaying: state => state.isPlaying,
departure: state => state.departure,
destination: state => state.destination,

*/
