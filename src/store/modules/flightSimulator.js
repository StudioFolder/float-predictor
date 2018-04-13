// import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    flightType: 'planned',
    isActive: false, // are we flying yet?
    isPlaying: true, // play/pause
    isSaving: false, // saving true sve image then sets to false
    loading: 0, // percentage of loading assets. Value in range [0-1].
    winds: 0, // 0 = none, 1 = B/W, 2 = Color
    guiVisible: false,
    selectedExplorer: 0,
    focusedExplorer: 0, // this is for onBoardExperience, if 0 none is focused
    focusedExplorerSpeed: 0, // onBoard data
    focusedExplorerDistance: 0, // onBoard data
    focusedExplorerAltitude: 0, // onBoard data
    elapsedDays: 0,
    coordinatesValid: false,
    visualizationState: 0,
    autoMode: false,
    departure: {},
    destination: {},
    altitudeLevel: 3, // General altitude
    initialAltitudeLevel: 3, // General altitude
    trajectoryId: -1,
    // used for the final recap: e.g.
    // The Aerocene Explorer that left from Milan...arrived within *km in *hours
    winningExplorerData: {
      departureDate: new Date(),
      minDist: 0,
      minTime: 0,
      svg: '',
    },
  },
  mutations: {
    changeFlightType(state, flightType) {
      state.flightType = flightType;
    },
    startAnimation(state) {
      state.isActive = true;
    },
    setActive(state, active) {
      state.isActive = active;
    },
    setGUIVisible(state, visible) {
      state.guiVisible = visible;
    },
    saveImage(state) { // the image will be saved after the next rendering
      state.isSaving = true;
    },
    setPlaying(state, playing) {
      state.isPlaying = playing;
    },
    setWinds(state, w) {
      state.winds = w;
    },
    setDestination(state, destination) { // FORMAT: { lat, lng, city, country };
      state.destination = destination;
    },
    setDeparture(state, departure) { // FORMAT: { lat, lng, city, country };
      state.departure = departure;
    },
    setSelectedExplorer(state, explorerId) {
      // eslint-disable-next-line
      console.log('+++++++++++++++ mutation')
      state.selectedExplorer = explorerId;
    },
    setFocusedExplorer(state, explorerId) {
      state.focusedExplorer = explorerId;
    },
    setFocusedExplorerSpeed(state, explorerSpeed) {
      state.focusedExplorerSpeed = explorerSpeed;
    },
    setFocusedExplorerDistance(state, explorerDistance) {
      state.focusedExplorerDistance = explorerDistance;
    },
    setFocusedExplorerAltitude(state, explorerAltitude) {
      state.focusedExplorerAltitude = explorerAltitude;
    },
    setElapsedDays(state, days) {
      state.elapsedDays = days;
    },
    setAltitudeLevel(state, altitudeLevel) {
      state.altitudeLevel = altitudeLevel;
    },
    setInitialAltitudeLevel(state, altitudeLevel) {
      state.initialAltitudeLevel = altitudeLevel;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSaving(state, isSaving) {
      state.isSaving = isSaving;
    },
    setWinningExplorerData(state, data) {
      state.winningExplorerData = data;
    },
    setCoordinatesValid(state, v) {
      state.coordinatesValid = v;
    },
    setVisualizationState(state, s) {
      state.visualizationState = s;
    },
    setTrajectoryId(state, i) {
      state.trajectoryId = i;
    },
    setAutoMode(state, s) {
      state.autoMode = s;
    },
  },
  actions: {
    // for async operations, https://vuex.vuejs.org/en/actions.html
    resetVisualization({ commit }) {
      commit('setPlaying', true); // if was stopped
      commit('setFocusedExplorer', 0);
      commit('setActive', false);
    },
  },
  getters: {
    isFreeFlight: state => state.flightType === 'free',
    isPlannedFlight: state => state.flightType === 'planned',
    visualMode: state => (state.focusedExplorer === 0 ? 'global' : 'onBoard'),
  },
};
