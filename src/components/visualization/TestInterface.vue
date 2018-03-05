<template>
  <div id="simple-interface">
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
        <li  v-on:click="active = true;">
          <a>START ></a>
        </li>
        <li class='explorer-selection' v-on:click="saving = true;">
          <a>SAVE ></a>
        </li>
        <li class='explorer-selection' v-on:click="playing = !playing;">
          <a v-if="playing">PAUSE ||</a>
          <a v-if="!playing">PLAY ></a>
        </li>
        <li class='explorer-selection' v-on:click="focusedExplorer = 0;">
          <router-link to="/gallery">GO TO GALLERY ></router-link>
        </li>
        <li>DAY {{days}}/16</li>
      </ul>
      <h4>EXPLORERS</h4>
      <ul>
        <li class='explorer-selection' v-for="(c, index) in colors"
          v-bind:key="index" v-if="days > 0 && index < days">
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
import Visualization from '../Visualization';

export default {
  name: 'TestInterface',
  data() {
    return {
      colors: ['#003769', '#2e6a9c', '#0095d7', '#587a98', '#7eafd4', '#b9e5fb', '#656868', '#ffffff'],
    };
  },
  components: {
    VueGoogleAutocomplete, Visualization,
  },
  computed: {
    days() { return this.$store.state.flightSimulator.elapsedDays; },
    animationPlaying() { return this.$store.state.flightSimulator.isPlaying; },
    explorers() { return this.$store.state.flightSimulator.activeExplorers; },
    focusedExplorer: {
      get() {
        return this.$store.state.flightSimulator.focusedExplorer;
      },
      set(value) {
        this.$store.commit('flightSimulator/setFocusedExplorer', value);
      },
    },
    focusedExplorerSpeed() {
      return this.$store.state.flightSimulator.focusedExplorerSpeed;
    },
    focusedExplorerDistance() {
      return this.$store.state.flightSimulator.focusedExplorerDistance;
    },
    saving: {
      get() {
        return this.$store.state.flightSimulator.isSaving;
      },
      set(value) {
        this.$store.commit('flightSimulator/setSaving', value);
      },
    },
    active: {
      get() {
        return this.$store.state.flightSimulator.isActive;
      },
      set(value) {
        if (value) {
          this.$store.commit('flightSimulator/startAnimation');
        }
      },
    },
    playing: {
      get() {
        return this.$store.state.flightSimulator.isPlaying;
      },
      set(value) {
        this.$store.commit('flightSimulator/setPlaying', value);
      },
    },
    departure: {
      get() {
        return this.$store.state.flightSimulator.departure;
      },
      set(departure) {
        this.$store.commit('flightSimulator/setDeparture', departure);
      },
    },
    destination: {
      get() {
        return this.$store.state.flightSimulator.destination;
      },
      set(destination) {
        this.$store.commit('flightSimulator/setDestination', destination);
      },
    },
  },
  mounted() {
    this.destination = {
      lat: 35.652832,
      lng: 139.839478,
      city: 'Tokio',
      country: 'Japan',
    };
    this.departure = {
      lat: 52.520645,
      lng: 13.409779,
      city: 'Berlin',
      country: 'Germany',
    };
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
input{
  background: black;
  color:white;
  border-radius: 0px;
  margin-top:5px;
  margin-bottom:20px;

}
li { cursor: pointer; line-height: 1.4;}
li{
  color:#dadada;
}
li:hover{
  color:blue;
}
#simple-interface{
  z-index: 10;
  position: absolute;
  height: 100vh;
}
.bottom-right-panel{
  z-index: 2;
  position: fixed;
  right:20px;
  bottom: 0px;
  padding: 50px;
}
.bottom-right-panel a{
  margin-left:20px;
}

.top-left-panel{
  position:absolute;
  left:20px;
  top:0px;
  padding:50px;
  font-size:16px;
  color:white;
  z-index:2;
}

.bottom-left-panel{
  position:absolute;
  left:20px;
  padding:50px;
  bottom:0px;
  font-size:16px;
  color:white;
  z-index:2;
  width: 300px;
}
/*
.cover{
  display: none !important;
}
.dg.ac, .dg.main.a{
  z-index: 16 !important;
  display: inherit;
}
.dg.ac{
  z-index: 16!important;
}*/
</style>
