export default {
  namespaced: true,
  state: {
    isLoading: true, // are we still loading?
    isMenuOpen: false,
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
  },
  getters: {
    isSmall: state => state.deviceName === 'small',
  },
};
