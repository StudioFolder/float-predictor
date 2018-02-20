<template>
  <div class="main-content over" :style="{ height: upperHeight }">
      <!--just the animation here-->
      <div v-if="isChoosing" ref="content" class="flight-form container">
          <b-form @submit="onSubmit">
              <div class="type-selector-group">
                  <b-form-checkbox id="FlightTypeSelector"
                                   v-model="flightType"
                                   value="free"
                                   unchecked-value="planned"
                                   class="type-selector"
                                   :class="flightType">
                      <div class="type-selector">
                          <span :class="{'--isActive': isPlanned}">Planned Flight</span>
                          <span class="slider round"></span>
                          <span :class="{'--isActive': isFree}">Free Flight</span>
                      </div>
                  </b-form-checkbox>
                  <p class="description">{{label}}</p>
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
                  <label v-if="(flightType === 'planned')" class="small">To</label>
                  <vue-google-autocomplete
                          v-if="(flightType === 'planned')"
                          id="map2" classname="form-control"
                          :placeholder="placeholder.destination"
                          @placechanged="setDestination"
                          types="(cities)"
                          rtypes="geocode">
                  </vue-google-autocomplete>
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
    };
  },
  computed: {
    hasErrors() {
      return (this.form.errors.departure || this.form.errors.destination);
    },
    placeholder() {
      return {
        departure: (this.form.errors.departure) ? this.form.errors.departure : 'Departure',
        destination: (this.form.errors.destination) ? this.form.errors.destination : 'Destination',
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
    label() {
      return (this.isPlanned)
        ? 'Planned Flights try to reach a specific destination starting from a selected departure point.'
        : 'Free Flights are different';
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      // this.upperHeight = 0;
      this.validateForm()
        .then(() => {
          this.form.errors = {}; // reset previous errors
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
    this.upperHeight = (this.$refs.content) ? `${this.$refs.content.clientHeight}px` : 0;
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .flight-form.container {
        position: relative;
        top: 0;
        width: 450px;
        margin: 0 auto;
        background: linear-gradient(180deg, $lightGray, rgba(0, 0, 0, 0));
        padding: $marginBase 1rem;
        color: $gray;
        text-align: center;
        @include medium_down {
            width: auto;
            padding: 1em;
            margin: $marginBase+3rem $marginBase;
            background: $lightBlack;
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
            padding: 0.6em 0 0.3em 0;
            margin-bottom: 1em;
        }
        .input-label {
            text-align: center;
        }
        .small {
            font-size: .6em;
        }
    }
body.flight-simulator {
    .cover {
        width: 0;
    }
}
</style>
