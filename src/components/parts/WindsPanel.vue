<template>
    <div class="winds-panel">
        <div class="body">
            <div class="type-selector-group">
                <div class="type-selector custom-checkbox on-off-selector"
                    :class="{'--on': isOn}">
                    <input id="windsOnOffSelector"
                           v-model="isOn"
                           type="checkbox"
                           autocomplete="off"
                           class="custom-control-input">
                    <label for="windsOnOffSelector">
                        <div class="type-selector">
                            <span :class="[{'--isActive': isOn}, '--left']">On</span>
                            <span class="slider round"></span>
                            <span :class="{'--isActive': !isOn}">Off</span>
                        </div>
                    </label>
                </div>
            </div>
            <transition name="fade">
                <div v-if="isOn" class="type-selector-group">
                    <div class="type-selector custom-checkbox color-selector"
                         :class="{'--color': isColor}">
                        <input id="colorSelector"
                               v-model="isColor"
                               type="checkbox"
                               autocomplete="off"
                               class="custom-control-input">
                        <label for="colorSelector">
                            <div class="type-selector">
                                <span :class="[{'--isActive': isColor}, '--left']">Enhanced</span>
                                <span class="slider round"></span>
                                <span :class="{'--isActive': !isColor}">Basic</span>
                            </div>
                        </label>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-if="isOn" class="type-selector-group">
                    <div class="type-selector custom-checkbox animation-selector"
                         :class="{'--animated': isAnimated}">
                        <input id="animationSelector"
                               v-model="isAnimated"
                               type="checkbox"
                               autocomplete="off"
                               class="custom-control-input">
                        <label for="animationSelector">
                            <div class="type-selector">
                            <span :class="[{'--isActive': isAnimated}, '--left']">Animated
                            </span>
                                <span class="slider round"></span>
                                <span :class="{'--isActive': !isAnimated}">Static</span>
                            </div>
                        </label>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade-wind-panel" mode="out-in">
            <altitude-panel v-if="isAltPanelOpen"
                            key="panel"
                            :isFull="true">
            </altitude-panel>
        </transition>
        <div class="button-container" key="button">
            <transition name="fade" mode="out-in">
                <b-button v-if="!isAltPanelOpen"
                          @click="openAltitudePanel" variant="primary">
                    Explore Winds
                </b-button>
                <b-button v-if="isAltPanelOpen"
                          @click="closeAltPanel" variant="primary">
                    Close Panel
                </b-button>
            </transition>
        </div>
        <div class="box-footer">
            <transition name="switch-text">
                <p v-if="!isAltPanelOpen && isOn" key="closed">
                    Aerocene Sculptures normally float between 8,000 and 16,000 m.
                    Here you can explore wind patterns in the atmosphere at different altitudes.
                    This will temporarily pause the float simulation.
                </p>
                <p v-else-if="isOn" key="open">
                    Closing this panel will resume the float
                    simulation at the initial altitude of {{initialAltLevel}}.
                </p>
            </transition>
            <p class="small data-credits">
                Data source: GFS
            </p>
        </div>
    </div>
</template>

<script>
import altitudePanel from './AltitudePanel';

export default {
  name: 'winds-panel',
  components: { altitudePanel },
  data() {
    return {
      altValues: ['100 m', '1,500 m',
        '5,5000 m', '10,000 m', '16,000 m',
        '21,500 m', '26,500 m',
      ],
    };
  },
  computed: {
    initialAltLevel() {
      return this.altValues[this.$store.state.flightSimulator.initialAltitudeLevel];
    },
    isAltPanelOpen: {
      get() {
        return this.$store.state.general.isAltPanelOpen;
      },
      set(v) {
        this.$store.commit('general/setAltPanel', v);
      },
    },
    isInfoBoxOpen: {
      get() {
        return this.$store.state.general.isInfoBoxOpen;
      },
      set(v) {
        this.$store.commit('general/setInfoBox', v);
      },
    },
    isOn: {
      get() {
        return this.$store.state.flightSimulator.winds !== 0;
      },
      set(v) {
        if (v) {
          if (this.isColor && this.isAnimated) {
            this.$store.commit('flightSimulator/setWinds', 2);
          } else if (!this.isColor && this.isAnimated) {
            this.$store.commit('flightSimulator/setWinds', 1);
          } else if (this.isColor && !this.isAnimated) {
            this.$store.commit('flightSimulator/setWinds', 4);
          } else if (!this.isColor && !this.isAnimated) {
            this.$store.commit('flightSimulator/setWinds', 3);
          }
        } else {
          this.$store.commit('flightSimulator/setWinds', 0);
          this.isAltPanelOpen = false;
        }
      },
    },
    isColor: {
      get() {
        return (this.$store.state.flightSimulator.winds === 4
          || this.$store.state.flightSimulator.winds === 2);
      },
      set(v) {
        if (this.isOn) {
          if (this.isAnimated) {
            if (v) {
              this.$store.commit('flightSimulator/setWinds', 2);
            } else {
              this.$store.commit('flightSimulator/setWinds', 1);
            }
          } else if (v) { // static
            this.$store.commit('flightSimulator/setWinds', 4);
          } else {
            this.$store.commit('flightSimulator/setWinds', 3);
          }
        } else {
          this.$store.commit('flightSimulator/setWinds', 0);
        }
      },
    },
    isAnimated: {
      get() {
        return (this.$store.state.flightSimulator.winds === 1
          || this.$store.state.flightSimulator.winds === 2);
      },
      set(v) {
        if (this.isOn) {
          if (this.isColor) {
            if (v) {
              this.$store.commit('flightSimulator/setWinds', 2);
            } else {
              this.$store.commit('flightSimulator/setWinds', 4);
            }
          } else if (v) { // white
            this.$store.commit('flightSimulator/setWinds', 1);
          } else {
            this.$store.commit('flightSimulator/setWinds', 3);
          }
        } else {
          this.$store.commit('flightSimulator/setWinds', 0);
        }
      },
    },
    altitudeLevel: {
      get() {
        return this.$store.state.flightSimulator.altitudeLevel;
      },
      set(v) {
        const alt = parseInt(v, 10);
        this.$store.commit('flightSimulator/setAltitudeLevel', alt);
      },
    },
  },
  methods: {
    openAltitudePanel() {
      // todo: find a better method to take into account the possibility that the user is on board
      if (this.$store.state.flightSimulator.focusedExplorer !== 0) {
        this.$store.commit('flightSimulator/setFocusedExplorer', 0);
        setTimeout(() => {
          this.$store.commit('flightSimulator/setPlaying', false);
        }, 5000);
        this.isAltPanelOpen = true;
      } else {
        this.$store.commit('flightSimulator/setPlaying', false);
        this.isAltPanelOpen = true;
      }
      if (this.isInfoBoxOpen) {
        this.isInfoBoxOpen = false;
      }
    },
    closeAltPanel() {
      this.isAltPanelOpen = false;
      this.$store.commit('flightSimulator/setPlaying', true);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
$elemHeight: 30px;
.winds-panel {
    flex-flow: column;
    .body,
    .box-footer {
        padding: 20px;
    }
    .body .custom-checkbox span{
        display: inline-block;
        &.slider {
            margin-top: 10px;
            margin-bottom: -7px;
        }
    }
    .altitude-panel {
        padding-top: $elemHeight;
        flex-flow: column;
        .panel-title{
            text-transform: uppercase;
            text-align: center;
        }
        .altitude-panel-inner {
            flex-flow: column;
            width: 100%;
            > .column {
                margin: 0 auto;
                display: flex;
            }
            .stratosphere, .troposphere {
                margin-top: 0;
                margin-right: 60px;
            }
            .--description {
                opacity: 0;
                order: 3;
                width: 100%;
                flex-flow: row-reverse;
                > div {
                    flex: 0 0 115px;
                }
            }
            .--slider {
                order: 1;
                width: 700px;
                .input-wrapper {
                    width: 100%;
                    transform: unset;
                }
            }
            .--altitudes {
                order: 2;
                width: 100%;
                flex-flow: row-reverse;
                justify-content: center;
                > div {
                    flex: 0 0 115px;
                }
            }
        }
    }
    p {
        font-size: 14px;
        color: $gray;
        text-align: center;
        margin-top: 15px;
    }
    .box-footer {
        padding-top: 0;
        flex-flow: column;
        p:not(.small) {
            color: #FFF;
        }
        p:first-child {
            margin-top: 0;
        }
    }
    .data-credits {
        color: $gray;
        display: block;
        text-align: center;
    }
    .button-container {
        text-align: center;
        margin-bottom: 20px;
    }
    .type-selector {
        &.on-off-selector.--on,
        &.color-selector.--color,
        &.animation-selector.--animated {
            .slider:before {
                transform: translateX(-22px);
            }
        }
        span {
            text-transform: none;
            &:not(.slider) {
                min-width: 75px;
                text-align: left;
            }
            &.--left {
                text-align: right;
            }
        }
        label {
            width: 100%;
            min-width: 250px;
            .type-selector {
                display: block;
                justify-content: center;
                padding: $marginItem;
            }
        }
    }
}
</style>
