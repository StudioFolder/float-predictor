export default {
  namespaced: true,
  state: {
    isLoading: true, // are we still loading?
    isChoosingDestination: false,
    isMenuOpen: false,
    isInfoBoxOpen: false,
    deviceName: '', // (small, medium, big) or (phone, tablet, desktop) ???
  },
  mutations: {
    loadingComplete(state) {
      state.isLoading = false;
    },
    setDevice(state, deviceName) {
      state.deviceName = deviceName;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    toggleForm(state) {
      state.isChoosingDestination = !state.isChoosingDestination;
    },
  },
  getters: {
    isSmall: state => state.deviceName === 'small',
  },
};
