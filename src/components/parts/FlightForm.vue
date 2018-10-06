<template>
    <b-form @submit="onSubmit" class="flight-form">
        <div class="type-selector-group">
            <b-form-checkbox id="FlightTypeSelector"
                             v-model="flightType"
                             value="free"
                             unchecked-value="planned"
                             class="type-selector"
                             :class="flightType">
                <div class="type-selector">
                    <span @click="onSelect"
                          :class="{'--isActive': isPlanned}"
                          id="jsPlanned">Planned Float</span>
                    <span @click="onSelect"
                          :class="{'--isActive': isFree}"
                          id="jsFree">Free Float</span>
                </div>
            </b-form-checkbox>
        </div>
        <transition name="fade" mode="out-in">
            <div class="selector-group" v-if="isPlanned" key="planned-flight">
                <div class="departure">
                    <label class="small">From</label>
                    <vue-google-autocomplete
                            id="map" classname="form-control"
                            :placeholder="placeholder.departure"
                            @placechanged="setDeparture"
                            types="(cities)"
                            rtypes="geocode">
                    </vue-google-autocomplete>
                </div>
                <div class="optional-destination">
                    <label  class="small">To</label>
                    <vue-google-autocomplete
                            id="map2" classname="form-control"
                            :placeholder="placeholder.destination"
                            @placechanged="setDestination"
                            types="(cities)"
                            rtypes="geocode">
                    </vue-google-autocomplete>
                </div>
                <altitude-selector />
            </div>
            <div class="selector-group" v-else key="free-flight">
                <div class="departure">
                    <label class="small">From</label>
                    <vue-google-autocomplete
                            id="map" classname="form-control"
                            :placeholder="placeholder.departure"
                            @placechanged="setDeparture"
                            types="(cities)"
                            rtypes="geocode">
                    </vue-google-autocomplete>
                </div>
                <altitude-selector />
            </div>
        </transition>
        <transition name="switch-text">
            <p v-if="isPlanned" class="description" key="planned">
                A ‘Planned Float’ tries to reach a specific
                destination starting from a selected departure point.
                Enter both locations to start your journey.
            </p>
            <p v-else class="description" key="free">
                A ‘Free Float’ needs just a departure point:
                winds and thermal air currents will do the rest.
            </p>
        </transition>
        <div class="button-container">
            <b-button type="submit" variant="primary">Launch</b-button>
        </div>
    </b-form>
</template>
<script>
/**
 * @author Studio Folder - @StudioFolder
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import _ from 'lodash';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import altitudeSelector from './AltitudeSelector';

export default {
  name: 'flight-form',
  data() {
    return {
      form: {
        errors: {
        },
      },
    };
  },
  components: { VueGoogleAutocomplete, altitudeSelector },
  computed: {
    hasErrors() {
      return (this.form.errors.departure || this.form.errors.destination);
    },
    transitionName() {
      return (this.isFree) ? 'leave-right' : 'leave-left';
    },
    isFree() { return (this.$store.getters['flightSimulator/isFreeFlight']); },
    isPlanned() { return (this.$store.getters['flightSimulator/isPlannedFlight']); },
    placeholder() {
      let departureStr = 'Departure';
      let destinationStr = 'Destination';
      if (this.form.errors.departure) {
        departureStr = this.form.errors.departure;
      } else if (!_.isEmpty(this.departure)) {
        departureStr = `${this.departure.city}, ${this.departure.country}`;
      }
      if (this.form.errors.destination) {
        destinationStr = this.form.errors.destination;
      } else if (!_.isEmpty(this.destination)) {
        destinationStr = `${this.destination.city}, ${this.destination.country}`;
      }
      return {
        departure: departureStr,
        destination: destinationStr,
      };
    },
    departure: {
      get() {
        return this.$store.state.flightSimulator.departure;
      },
      set(value) {
        this.$store.commit('flightSimulator/setDeparture', value);
      },
    },
    destination: {
      get() {
        return this.$store.state.flightSimulator.destination;
      },
      set(value) {
        this.$store.commit('flightSimulator/setDestination', value);
      },
    },
    flightType: { // free or planned
      get() {
        return this.$store.state.flightSimulator.flightType;
      },
      set(value) {
        this.$store.commit('flightSimulator/changeFlightType', value);
      },
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      // this.upperHeight = 0;
      this.validateForm()
        .then(() => {
          this.form.errors = {}; // reset previous errors
          // reset elapsed days from previous simulation if necessary
          this.$store.commit('flightSimulator/setElapsedDays', 0);
          this.startAnimation();
        }).catch((errors) => {
          this.form.errors = errors;
        });
    },
    setDeparture(e, p) {
      // console.log('Departure set');
      // console.dir(e);
      // console.dir(p);
      let locality = e.locality;
      if (locality === undefined) {
        locality = p.vicinity;
        if (locality === undefined) {
          locality = '';
        }
      }
      this.departure =
        { lat: e.latitude, lng: e.longitude, city: locality, country: e.country };
    },
    setDestination(e, p) {
      let locality = e.locality;
      if (locality === undefined) {
        locality = p.vicinity;
        if (locality === undefined) {
          locality = '';
        }
      }
      this.destination =
        { lat: e.latitude, lng: e.longitude, city: locality, country: e.country };
    },
    validateForm() {
      const errors = {};
      let hasErrors = false;
      return new Promise((resolve, reject) => {
        if (_.isEmpty(this.departure)) { // departure always filled
          errors.departure = 'Please choose a departure location';
          hasErrors = true;
        }
        if (_.isEmpty(this.destination) && this.flightType === 'planned') {
          errors.destination = 'Please choose a destination for a planned flight';
          hasErrors = true;
        }
        if (hasErrors) {
          reject(errors);
        } else {
          resolve();
        }
      });
    },
    onSelect(e) {
      if (e.target.classList.contains('--isActive')) {
        e.preventDefault();
      }
    },
    startAnimation() {
      this.$store.commit('flightSimulator/setDeparture', this.departure);
      this.$store.commit('flightSimulator/setDestination', this.destination);
      this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('flightSimulator/setVisualizationState', 1);
      this.$store.commit('general/setFormStatus', false);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
form.flight-form {
    text-align: center;
    p {
        font-size: .85em;
    }
    .description {
        margin: 1em auto .5em;
        min-height: 48px;
    }
    .type-selector-group .type-selector span {
        padding: 20px 0;
        background-color: rgb(15,15,15);
        &.--isActive {
            color: #fff;
            background-color: $bodyColor;
        }
    }
}

.type-selector-group{
  position: relative;
  display: block;
  text-align: center;

  input {
    display:none;
  }
  label[for="FlightTypeSelector"] {
    width: 100%;
    &:after, &:before {
      display: none;
    }
  }

  .type-selector {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0;
    span {
      color: $gray;
      transition: color .4s ease;
      flex: 1 0 50%;
        &.--isActive {
            color: #fff;
            background-color: $bodyColor;
        }
    }
    .slider {
      display: block;
      width: 44px;
      height: 25px;
      position: relative;
      cursor: pointer;
      background-color: rgba(255, 255, 255, .2);
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 34px;
      margin: 0 10px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 25px;
      width: 25px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
      border-radius: 50%;
    }
    &.planned {
      .slider:before {
        transform: translateX(-22px);
      }
    }
  }
}
.selector-group {
  text-align: left;
  padding: $marginMobile;
  display: flex;
  min-height: 146px;
  > div {
    flex: 1 0 auto;
    padding: 0 $marginMobile;
  }
  .form-group {
    margin-top: 1em;
  }
  .form-control {
    font-size: 1em;
    padding: 0.1em 0 0.3em 0;
    margin-bottom: 1.4em;
  }
  .input-label {
    color: #FFF;
    text-align: center;
    padding-top: .1em;
  }
  .small {
    font-size: .6em;
  }
}
</style>
