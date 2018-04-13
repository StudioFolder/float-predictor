<template>
  <div class="main-content over" :style="{ height: upperHeight }">
      <!--just the animation here-->
      <div v-if="isChoosing" class="flight-form wrapper shadowed" ref="content">
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
              </div>
              <div class="altitude-selector-group">
                  <div class="input-group altitude-select">
                      <label class="small">Float Altitude</label>
                      <div class="alt-select" @click="toggleAltPanel">
                          <span>{{ form.altValues[selectedAlt] }}</span>
                          <i class="fp fp-caret-down"
                             :class="{'isOpen': isAltPanelOpen}">
                          </i>
                      </div>
                  </div>
                  <transition name="select-slide">
                      <div v-if="isAltPanelOpen"
                           class="alt-panel-wrapper"
                           @click="closeAltPanel">
                          <altitude-panel :isFull="false">
                          </altitude-panel>
                      </div>

                  </transition>
                  <p class="input-label">
                      Aerocene sculptures always leave at noon with sun light.
                  </p>
              </div>
              <b-button type="submit" variant="primary">Launch</b-button>
          </b-form>
      </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import _ from 'lodash';
import altitudePanel from 'Parts/AltitudePanel';

export default {
  name: 'FlightSimulator',
  components: { VueGoogleAutocomplete, altitudePanel },
  data() {
    return {
      upperHeight: 0,
      form: {
        errors: {
        },
        altValues: ['100 m', '1,500 m',
          '5,5000 m', '10,000 m', '16,000 m',
          '21,500 m', '26,500 m',
        ],
      },
    };
  },
  computed: {
    isAltPanelOpen: {
      get() {
        return this.$store.state.general.isAltPanelOpen;
      },
      set(v) {
        this.$store.commit('general/setAltPanel', v);
      },
    },
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
    closeAltPanel() {
      this.isAltPanelOpen = false;
    },
    toggleAltPanel() {
      this.isAltPanelOpen = !this.isAltPanelOpen;
    },
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
    .input-label {
        color: #FFF;
        text-align: left;
        //padding-top: .1em;
        padding-left: 1.2em;
        @include small_down {
            padding-left: 0;
        }
    }
}
.input-group {
    .small {
        font-size: .6em;
        padding-top: 9px;
        @include small_down {
            padding-top: 4px;
        }
    }
}
.altitude-selector-group {
    position: relative;
    display: flex;
    align-items: center;
    @include small_down {
        align-items: flex-start;
    }
    .input-group {
        width: 110px;
        flex: 0 0 110px;
    }
    .alt-select {
        width: 90px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        @include small_down {
            width: 85px;
        }
    }
    span {
        text-align: left;
        width: 75px;
        @include small_down {
            width: 80px;
        }
    }
    i {
        background-size: cover;
        transform: rotate(0deg);
        transition: transform .2s;
        min-height: 9px;
        min-width: 11px;
        height: 9px;
        width: 11px;
        @include small_down {
            transform: rotate(180deg);
        }
        &.isOpen {
            transform: rotate(180deg);
            @include small_down {
                transform: rotate(0deg);
            }
        }
    }
    .alt-panel-wrapper {
        overflow: hidden;
        box-shadow: 0 0 30px 1px rgba(0,0,0,.5);
        position: absolute;
        bottom: -220px;
        left: 0;
        height: 220px;
        background-color: $lightBlack;
        padding: 5px 1em;
        @include small_down {
            bottom: 45px;
        }
        .altitude-panel {
            .altitude-panel-inner {
                padding-top: 0;
            }
        }
    }
    .select-slide-enter-active {
        animation: select-slide-up .3s ease-in-out;
        @include small_up {
            animation: select-slide-down .3s ease-in-out;
            width: 90px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 0;
            }
        }
    }
    .select-slide-leave-active {
        animation: select-slide-up .2s ease-in-out reverse;
        @include small_up {
            animation: select-slide-down .3s ease-in-out reverse;
            width: 90px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 0;
            }
        }
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
@keyframes select-slide-up {
    0% {height: 0;}
    100% {height: 210px;}
}
@keyframes select-slide-down {
    0% {height: 0; bottom: 0;}
    100% {height: 210px; bottom: -210px;}
}
</style>
