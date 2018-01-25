<template>
    <div class="flight-form container">
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
                <b-form-group id="departureInput"
                              label-for="departureInput"
                              label="From">
                    <b-form-input type="text"
                                  v-model="form.departure"
                                  required
                                  placeholder="Departure">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="destinationInput"
                              label-for="destinationInput"
                              label="To">
                    <b-form-input type="text"
                                  label="To"
                                  v-model="form.destination"
                                  placeholder="Destination">
                    </b-form-input>
                </b-form-group>
            </div>
            <p>Click on globe to select locations or enter them here.</p>
            <b-button type="submit" variant="primary">Launch</b-button>
        </b-form>
    </div>
</template>
<script>

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
  computed: {
    flightType: {
      get() {
        return this.$store.state.flightSimulator.flightType;
      },
      set(value) {
        this.$store.commit('flightSimulator/changeFlightType', value);
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
    onSubmit() {
      // console.log('submitted');
    },
  },
};
</script>
<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .flight-form.container {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 450px;
        margin: 0 auto;
        background: linear-gradient(180deg, $lightGray, $bodyColor);
        padding: 2rem 1rem;
        color: $lightGray;
        text-align: center;
    }
    .type-selector-group{
        position: relative;
        display: block;
        text-align: center;

        input {
            display:none;
        }

        .description {
            max-width: 318px;
            margin: 1em auto;
            min-height: 48px;
        }

        .type-selector {

            span {
                text-transform: uppercase;
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

        label {
            font-size: .8em;
        }
        .form-group {
            margin-top: 1em;
        }
        .form-control {
            font-size: 1em;
            padding: 0.6em 0 0.3em 0;
        }
        input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid $lightGray;
        }
    }
    .btn {
        margin-top: 1em;
    }
</style>
