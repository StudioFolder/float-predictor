export default {
  namespaced: true,
  state: {
    isLoading: true, // are we still loading?
    transitionName: '',
    // upperHeight: '0px',
    // bottomHeight: '0px',
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
    // setUpperHeight(state, value) {
    //   state.upperHeight = value;
    // },
    // setBottomHeight(state, value) {
    //   state.bottomHeight = value;
    // },
    setDevice(state, deviceName) {
      state.deviceName = deviceName;
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
    },
    setFormStatus(state, value) {
      state.isChoosingDestination = value;
    },
  },
  getters: {
    isSmall: state => state.deviceName === 'small',
  },
};
