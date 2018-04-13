<template>
  <div class="main-content over" :style="{ height: upperHeight }">
      <!--just the animation here-->
      <div v-if="isChoosing" class="flight-form wrapper" ref="content">
          <b-form @submit="onSubmit">
              <div class="type-selector-group">
                  <b-form-checkbox id="FlightTypeSelector"
                                   v-model="flightType"
                                   value="free"
                                   unchecked-value="planned"
                                   class="type-selector"
                                   :class="flightType">
                      <div class="type-selector">
                          <span :class="{'--isActive': isPlanned}">Planned Float</span>
                          <span class="slider round"></span>
                          <span :class="{'--isActive': isFree}">Free Float</span>
                      </div>
                  </b-form-checkbox>
                  <transition name="switch-text">
                      <p v-if="isPlanned" class="description" key="planned">
                          Planned floats try to reach a specific destination
                          starting from a selected departure point.
                      </p>
                      <p v-else class="description" key="free">
                          Free floats start from a selected departure point to
                          fly along following the wind.
                      </p>
                  </transition>
              </div>
              <div class="coordinates-selector-group">
                  <label class="small">From</label>
                  <vue-google-autocomplete
                          id="map" classname="form-control"
                          :placeholder="placeholder.departure"
                          @placechanged="setDeparture"
                          types="(cities)"
                          rtypes="geocode">
                  </vue-google-autocomplete>
                  <transition name="fade-height">
                      <div class="optional-destination" v-if="(flightType === 'planned')">
                        <label  class="small">To</label>
                        <vue-google-autocomplete
                          id="map2" classname="form-control"
                          :placeholder="placeholder.destination"
                          @placechanged="setDestination"
                          types="(cities)"
                          rtypes="geocode">
                        </vue-google-autocomplete>
                      </div>
                  </transition>
                  <p class="input-label">
                      Aerocene sculptures always leave at noon with sun light.
                  </p>
              </div>
              <div class="altitude-selector-group">
                  <b-form-select
                          v-model="selectedAlt"
                          :options="altOptions"
                          class="mb-3"
                          size="sm">
                  </b-form-select>
              </div>
              <b-button type="submit" variant="primary">Launch</b-button>
          </b-form>
      </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import _ from 'lodash';

export default {
  name: 'FlightSimulator',
  components: { VueGoogleAutocomplete },
  data() {
    return {
      upperHeight: 0,
      form: {
        errors: {
        },
      },
      altOptions: [
        { value: 6, text: '26,500 meters' },
        { value: 5, text: '21,500 meters' },
        { value: 4, text: '16,000 meters' },
        { value: 3, text: '10,000 meters' },
        { value: 2, text: '5,5000 meters' },
        { value: 1, text: '1,500 meters' },
        { value: 0, text: '100 meters' },
      ],
    };
  },
  computed: {
    selectedAlt: {
      get() {
        return this.$store.state.flightSimulator.altitudeLevel;
      },
      set(v) {
        const alt = parseInt(v, 10);
        this.$store.commit('flightSimulator/setAltitudeLevel', alt);
      },
    },
    hasErrors() {
      return (this.form.errors.departure || this.form.errors.destination);
    },
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
    isChoosing() { return (this.$route.name === 'flight-simulator' && this.$store.state.general.isChoosingDestination); },
    isFree() { return (this.$store.getters['flightSimulator/isFreeFlight']); },
    isPlanned() { return (this.$store.getters['flightSimulator/isPlannedFlight']); },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.validateForm()
        .then(() => {
          this.form.errors = {}; // reset previous errors
          // reset elapsed days from previous simulation if necessary
          this.$store.commit('flightSimulator/setElapsedDays', 0);
          this.$store.commit('flightSimulator/setAltitudeLevel', this.selectedAlt);
          this.startAnimation();
        }).catch((errors) => {
          this.form.errors = errors;
        });
    },
    setDeparture(e) {
      this.departure =
        { lat: e.latitude, lng: e.longitude, city: e.locality, country: e.country };
    },
    setDestination(e) {
      this.destination =
        { lat: e.latitude, lng: e.longitude, city: e.locality, country: e.country };
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
    startAnimation() {
      this.$store.commit('flightSimulator/startAnimation');
      this.$store.commit('general/setFormStatus', false);
      this.$store.commit('general/setAnimationHeight', 'normal');
    },
  },
  mounted() {
    this.upperHeight = (this.$refs.content) ? `${this.$refs.content.clientHeight + 80}px` : 0;
    /**
     * check if mobile and toggle full screen
     */
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.scrollTo(0, 1);
    }
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.flight-form.wrapper {
    position: relative;
    top: 0;
    width: 450px;
    margin: 0 auto;
    background: linear-gradient(180deg, $lightBlack, black);
    padding: $marginBase $marginBase*4/5;
    color: $gray;
    text-align: center;
    @include between($medium, $large) {
        position: absolute;
        top: 300px;
        left: 50%;
        transform: translateX(-50%);
    }
    @include medium_down {
        width: auto;
        padding: $marginMobile*2/3;
        // height: calc(100vh - 80px - #{$marginMobile});
        margin: 80px auto $marginMobile;
        background: $lightBlack;
        max-width: 500px;
        form {
            height: 100%;
            display: flex;
            flex-flow: column;
            justify-content: space-evenly;
        }
    }
    @include small_down {
        margin: 40px $marginMobile $marginMobile;
    }
    p {
        font-size: .85em;
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
        &:after, &:before {
            display: none;
        }
    }
    .description {
        margin: 1em auto .5em;
        min-height: 48px;
    }

    .type-selector {
        display: flex;
        //width: 100%;
        justify-content: center;
        align-items: center;
        span {
            color: $gray;
            transition: color .4s ease;
            &.--isActive {
                color: #fff;
            }
        }
        .slider {
            display: inline-block;
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
.coordinates-selector-group {
    text-align: left;
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
.altitude-selector-group {
    select {
        background-color: $bodyColor;
    }
}

.switch-text-enter-active {
    animation: flip-up-from-bottom .4s ease;
}
.switch-text-leave-active {
    position: absolute;
    animation: flip-up-to-top .4s ease;
}
.fade-height-leave-active {
    animation: fadeHeight .4s ease;
    overflow: hidden;
}
.fade-height-enter-active {
    animation: fadeHeight .4s ease-in-out reverse;
    overflow: hidden;
}
</style>
