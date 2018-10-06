<template>
  <div id="state-remote-sync">
  </div>
</template>
<script>
/**
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
*/

/* eslint-disable no-console */

import _ from 'lodash';

export default {
  name: 'StateRemoteSync',

  data() {
    return {
      connected: false,
      synced: false,
    };
  },

  components: {
  },

  computed: {
    flightType: {
      get() { return this.$store.state.flightSimulator.flightType; },
      set(value) { this.$store.commit('flightSimulator/changeFlightType', value); },
    },
    isActive: {
      get() { return this.$store.state.flightSimulator.isActive; },
      set(value) { this.$store.commit('flightSimulator/setActive', value); },
    },
    isPlaying: {
      get() { return this.$store.state.flightSimulator.isPlaying; },
      set(value) { this.$store.commit('flightSimulator/setPlaying', value); },
    },
    isSaving: {
      get() { return this.$store.state.flightSimulator.isSaving; },
      set(value) { this.$store.commit('flightSimulator/setSaving', value); },
    },
    loading: {
      get() { return this.$store.state.flightSimulator.loading; },
      set(value) { this.$store.commit('flightSimulator/setLoading', value); },
    },
    winds: {
      get() { return this.$store.state.flightSimulator.winds; },
      set(value) { this.$store.commit('flightSimulator/setWinds', value); },
    },
    focusedExplorer: {
      get() { return this.$store.state.flightSimulator.focusedExplorer; },
      set(value) { this.$store.commit('flightSimulator/setFocusedExplorer', value); },
    },
    focusedExplorerSpeed: {
      get() { return this.$store.state.flightSimulator.focusedExplorerSpeed; },
      set(s) { this.$store.commit('flightSimulator/setFocusedExplorerSpeed', s); },
    },
    focusedExplorerDistance: {
      get() { return this.$store.state.flightSimulator.focusedExplorerDistance; },
      set(d) { this.$store.commit('flightSimulator/setFocusedExplorerDistance', d); },
    },
    focusedExplorerAltitude: {
      get() { return this.$store.state.flightSimulator.focusedExplorerAltitude; },
      set(d) { this.$store.commit('flightSimulator/setFocusedExplorerAltitude', d); },
    },
    elapsedDays: {
      get() { return this.$store.state.flightSimulator.elapsedDays; },
      set(value) { this.$store.commit('flightSimulator/setElapsedDays', value); },
    },
    coordinatesValid: {
      get() { return this.$store.state.flightSimulator.coordinatesValid; },
      set(value) { this.$store.commit('flightSimulator/setCoordinatesValid', value); },
    },
    visualizationState: {
      get() { return this.$store.state.flightSimulator.visualizationState; },
      set(v) { this.$store.commit('flightSimulator/setVisualizationState', v); },
    },
    autoMode: {
      get() { return this.$store.state.flightSimulator.autoMode; },
      set(value) { this.$store.commit('flightSimulator/setAutoMode', value); },
    },
    departure: {
      get() { return this.$store.state.flightSimulator.departure; },
      set(departure) { this.$store.commit('flightSimulator/setDeparture', departure); },
    },
    destination: {
      get() { return this.$store.state.flightSimulator.destination; },
      set(destination) { this.$store.commit('flightSimulator/setDestination', destination); },
    },
    altitudeLevel: {
      get() { return this.$store.state.flightSimulator.altitudeLevel; },
      set(a) { this.$store.commit('flightSimulator/setAltitudeLevel', a); },
    },
    trajectoryId: {
      get() { return this.$store.state.flightSimulator.trajectoryId; },
      set(a) { this.$store.commit('flightSimulator/setTrajectoryId', a); },
    },
    winningExplorerData: {
      get() { return this.$store.state.flightSimulator.winningExplorerData; },
      set(value) { this.$store.commit('flightSimulator/setWinningExplorerData', value); },
    },
  },
  watch: {
    flightType() { this.pushState('flightType'); },
    // isActive() { this.pushState('isActive'); },
    isPlaying() { this.pushState('isPlaying'); },
    // loading() { this.pushState('loading'); },
    winds() { this.pushState('winds'); },
    focusedExplorer() { this.pushState('focusedExplorer'); },
    focusedExplorerSpeed() { this.pushState('focusedExplorerSpeed'); },
    focusedExplorerDistance() { this.pushState('focusedExplorerDistance'); },
    focusedExplorerAltitude() { this.pushState('focusedExplorerAltitude'); },
    elapsedDays() { this.pushState('elapsedDays'); },
    // coordinatesValid() { this.pushState('coordinatesValid'); },
    visualizationState() { this.pushState('visualizationState'); },
    autoMode() { this.pushState('autoMode'); },
    departure() { this.pushState('departure'); },
    destination() { this.pushState('destination'); },
    altitudeLevel() { this.pushState('altitudeLevel'); },
    trajectoryId() { this.pushState('trajectoryId'); },
    winningExplorerData() { this.pushState('winningExplorerData'); },
  },
  beforeCreate() {
  },
  mounted() {
    setTimeout(() => {
      console.log('mounted ****************************');
      this.loading = 1;
      this.verbose = true;
      this.data = JSON.parse(JSON.stringify(this.$store.state.flightSimulator));
      const url = 'static/exhibition/websocket_config.json';
      fetch(url)
        .then(r => r.json())
        .then((json) => {
          this.ip = json.ip;
          this.port = json.port;
          this.setupWS();
        })
        .catch((r) => { console.log(`Error in fetching ${url}: ${r}`); });
    }, 2000);
  },
  beforeDestroy() {
    this.ws.close();
    this.ws = undefined;
    clearInterval(this.timeout);
  },
  methods: {
    setupWS() {
      this.synced = false;
      const address = `ws://${this.ip}:${this.port}`;
      this.ws = new WebSocket(address);
      this.ws.onmessage = (data) => {
        this.statePushed(data);
      };
      this.ws.onopen = () => {
        this.timeout = undefined;
        this.connected = true;
        if (this.verbose) console.log('Open');
      };
      this.ws.onclose = () => {
        this.connected = false;
        this.ws.close();
        this.timeout = setTimeout(this.setupWS, 5000);
        if (this.verbose) console.log('Close');
      };
      this.ws.onerror = () => {
        this.connected = false;
        if (this.verbose) console.log('Error');
      };
    },
    pushState(value) {
      if (this.synced && this.connected && this[value] !== this.data[value]) {
        if (this.verbose) console.log(`Push State: ${value} -> ${this[value]}`);
        const data2Push = {};
        data2Push[value] = this[value];
        try {
          this.ws.send(JSON.stringify(data2Push));
          this.data[value] = this[value];
        } catch (e) {
          if (this.verbose) console.log(`Error in pushState: ${e.message}`);
          this.connected = false;
        }
      }
    },
    statePushed(e) {
      if (this.verbose) console.log('State pushed');
      this.synced = true;
      this.data = JSON.parse(e.data);
      if (this.connected) {
        _.each(this.data, (value, key) => {
          if (!this.isEqual(this[key], value)) {
            if (this.verbose) console.log(`State Push: ${key} <- ${value} was ${this[key]}`);
            this[key] = value;
          }
        });
      }
    },
    isEqual(a, b) {
      let result = true;
      if (typeof a === 'object' || typeof b === 'object') {
        result = JSON.stringify(a) === JSON.stringify(b);
      } else {
        result = a === b;
      }
      return result;
    },
  },
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#state-remote-sync{
  display: none;
}
</style>
