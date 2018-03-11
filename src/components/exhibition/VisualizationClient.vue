<template>
  <div id="visualization-server">
    <StateRemoteSync/>
    <div class="bottom-left-panel">
      <h4>GENERAL</h4>
      <span class="subtext">From</span>
      <vue-google-autocomplete id="map" classname="form-control" placeholder="Departure point"
          v-on:placechanged="setDeparture"
          types="(cities)"
          rtypes="geocode"></vue-google-autocomplete>
      <span class="subtext">To</span>
      <vue-google-autocomplete id="map2" classname="form-control" placeholder="Destination point"
          v-on:placechanged="setDestination"
          types="(cities)" rtypes="geocode"></vue-google-autocomplete>
      <ul>
        <li  v-if ="!isActive" v-on:click="isActive = true;">
          <a>START ></a>
        </li>
        <li  v-if ="isActive" v-on:click="isActive = false;">
          <a>STOP ></a>
        </li>
        <li class='explorer-selection' v-on:click="saving = true;">
          <a>SAVE ></a>
        </li>
        <li class='explorer-selection' v-on:click="isPlaying = !isPlaying;">
          <a v-if="isPlaying">PAUSE ||</a>
          <a v-if="!isPlaying">PLAY ></a>
        </li>
        <li class='explorer-selection' v-on:click="focusedExplorer = 0;">
          <router-link to="/gallery">GO TO GALLERY ></router-link>
        </li>
        <li>DAY {{elapsedDays}}/16</li>
      </ul>
      <h4>EXPLORERS</h4>
      <ul>
        <li class='explorer-selection' v-for="(c, index) in colors"
          v-bind:key="index" v-if="elapsedDays > 0 && index < elapsedDays">
          <a v-bind:style="{color: c}"
            v-on:click="focusedExplorer = index+1;">
            # {{index+1}}
          </a>
        </li>
        <li style='color:white;' class='explorer-selection' v-on:click="focusedExplorer = 0;">
          <a>#all</a>
        </li>
      </ul>
    </div>
    <div v-if="focusedExplorer!=0" class="bottom-right-panel">
      <ul>
        <li>EXPLORER DATA</li>
        <li>Speed: {{focusedExplorerSpeed}}</li>
        <li>Distance: {{focusedExplorerDistance}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import StateRemoteSync from './StateRemoteSync';

export default {
  name: 'TestInterface',
  data() {
    return {
      colors: ['#003769', '#2e6a9c', '#0095d7', '#587a98', '#7eafd4', '#b9e5fb', '#656868', '#ffffff'],
    };
  },
  components: {
    VueGoogleAutocomplete, StateRemoteSync,
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
  mounted() {
    const elements = document.getElementsByClassName('cover');
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  },
  methods: {
    setDeparture(e) {
      this.departure =
        { lat: e.latitude, lng: e.longitude, city: e.locality, country: e.country };
    },
    setDestination(e) {
      this.destination =
        { lat: e.latitude, lng: e.longitude, city: e.locality, country: e.country };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-left-panel{
  position: fixed;
  left: 0px;
  padding: 5%;
  bottom: 0px;
  z-index: 100;
}
.bottom-right-panel{
  position: fixed;
  right: 0px;
  padding: 5%;
  bottom: 0px;
  z-index: 100;
}
li { cursor: pointer; line-height: 1.4;}

</style>
