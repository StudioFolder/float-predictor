export default {
  namespaced: true,
  state: {
    isLoading: true, // are we still loading?
    transitionName: '',
    transitionMode: '',
    animationHeight: 'normal',
    isChoosingDestination: true,
    isMenuOpen: false,
    isInfoBoxOpen: false,
    deviceName: '', // (small, medium, big) or (phone, tablet, desktop) ???
  },
  mutations: {
    loadingComplete(state) {
      state.isLoading = false;
    },
    setTransition(state, value) {
      state.transitionName = value;
    },
    setTransitionMode(state, value) {
      state.transitionMode = value;
    },
    setDevice(state, deviceName) {
      state.deviceName = deviceName;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    toggleInfoBox(state) {
      state.isInfoBoxOpen = !state.isInfoBoxOpen;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    closeInfoBox(state) {
      state.isInfoBoxOpen = false;
    },
    setFormStatus(state, value) {
      state.isChoosingDestination = value;
    },
    setAnimationHeight(state, value) {
      state.animationHeight = value;
    },
  },
  getters: {
    isSmall: state => state.deviceName === 'small',
  },
};
