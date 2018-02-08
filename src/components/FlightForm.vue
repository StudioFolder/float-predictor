<template>
    <div v-show="!active" class="flight-form container">
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
                        id="map" classname="form-control" placeholder="Departure"
                        v-on:placechanged="setDeparture"
                        types="(cities)"
                        rtypes="geocode">
                </vue-google-autocomplete>
                <label class="small">To</label>
                <vue-google-autocomplete
                        id="map2" classname="form-control" placeholder="Destination"
                        v-on:placechanged="setDestination"
                        types="(cities)" rtypes="geocode">
                </vue-google-autocomplete>
                <p class="input-label">Click on globe to select locations or enter them here.</p>
            </div>
            <b-button type="submit" variant="primary">Launch</b-button>
        </b-form>
    </div>
</template>
<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
  name: 'flight-form',
  data() {
    return {
      form: {
        departure: '',
        destination: '',
      },
    };
  },
  components: {
    VueGoogleAutocomplete,
  },
  computed: {
    flightType: {
      get() {
        return this.$store.state.flightSimulator.flightType;
      },
      set(value) {
        this.$store.commit('flightSimulator/changeFlightType', value);
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
      this.$store.commit('flightSimulator/startAnimation');
      this.$store.commit('general/setFormStatus', false);
    },
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
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .flight-form.container {
        position: fixed;
        z-index: 5;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 450px;
        margin: 0 auto;
        background: linear-gradient(180deg, $lightGray, rgba(0, 0, 0, 0));
        padding: $marginBase 1rem;
        color: $gray;
        text-align: center;
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
    }
</style>
