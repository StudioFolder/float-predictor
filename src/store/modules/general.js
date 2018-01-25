export default {
  namespaced: true,
  state: {
    isLoading: true, // are we still loading?
    deviceName: '', // (small, medium, big) or (phone, tablet, desktop) ???
  },
  mutations: {
    loadingComplete(state) {
      state.isLoading = false;
    },
    setDevice(state, deviceName) {
      state.deviceName = deviceName;
    },
  },
  getters: {
    isSmall: state => state.deviceName === 'small',
  },
};
