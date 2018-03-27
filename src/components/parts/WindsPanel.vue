<template>
    <div class="info-box winds-panel shadowed">
        <div class="header">
            Winds
            <div class="close" @click="closeBox"></div>
        </div>
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
                <div v-if="isOn">
                    <div class="type-selector-group">
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
                    <p>Animated winds emphasise speed.<br>
                        Static winds highlight stream patterns.</p>
                </div>
            </transition>
            <transition name="fade" mode="out-in">
                <div v-if="isAltPanelOpen" class="altitude-panel" key="panel">
                    <div class="panel-title">Winds Altitude</div>
                    <div class="altitude-panel-inner">
                        <div class="column --description">
                            <div class="stratosphere" @click="setAltitude(4)"
                                 :class="{ 'isActive': altitudeLevel === 4}">stratosphere
                            </div>
                            <div class="tropopause" @click="setAltitude(3)"
                                 :class="{ 'isActive': altitudeLevel === 3}">
                                tropopause<span>jet streams</span>
                            </div>
                            <div class="troposphere" @click="setAltitude(1)"
                                 :class="{ 'isActive': altitudeLevel === 1}">
                                troposphere
                            </div>
                            <div class="sea-level" @click="setAltitude(0)"
                                 :class="{ 'isActive': altitudeLevel === 0}">
                                sea level
                            </div>
                        </div>
                        <div class="column --slider" :class="'alt-'+altitudeLevel">
                            <div class="input-wrapper">
                                <input type="range"
                                       v-model="altitudeLevel"
                                       min="0" max="6" step="1">
                            </div>
                        </div>
                        <div class="column --altitudes">
                            <div @click="setAltitude(6)"
                                 :class="{ 'isActive': altitudeLevel === 6}">26,500m
                            </div>
                            <div @click="setAltitude(5)"
                                 :class="{ 'isActive': altitudeLevel === 5}">21,500m</div>
                            <div @click="setAltitude(4)"
                                 :class="{ 'isActive': altitudeLevel === 4}">16,000m</div>
                            <div @click="setAltitude(3)"
                                 :class="{ 'isActive': altitudeLevel === 3}">10,000m</div>
                            <div @click="setAltitude(2)"
                                 :class="{ 'isActive': altitudeLevel === 2}">5,500m</div>
                            <div @click="setAltitude(1)"
                                 :class="{ 'isActive': altitudeLevel === 1}">1,500m</div>
                            <div @click="setAltitude(0)"
                                 :class="{ 'isActive': altitudeLevel === 0}">100m</div>
                        </div>
                    </div>
                </div>
                <div v-else-if="isOn" class="button-container" key="button">
                    <b-button @click="openAltitudePanel" v-if="!isAltPanelOpen" variant="primary">
                        Explore Winds
                    </b-button>
                </div>
            </transition>
        </div>
        <div class="box-footer">
            <transition name="fade" mode="out-in">
                <p v-if="!isAltPanelOpen && isOn" key="closed">
                    Aerocene Sculptures normally float between 8,000 and 16,000 m.
                    Here you can explore wind patterns in the atmosphere at different altitudes.
                    This will temporarily pause the float simulation.
                </p>
                <p v-else-if="isOn" key="open">
                    Closing this panel will resume the float
                    simulation at the default altitude of 10,000 m.
                </p>
            </transition>
            <p class="small data-credits">
                Data source: <a href="https://www.ncdc.noaa.gov/data-access/model-data/model-datasets/global-forcast-system-gfs">GFS</a>
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'winds-panel',
  computed: {
    isAltPanelOpen: {
      get() {
        return this.$store.state.general.isAltPanelOpen;
      },
      set(v) {
        this.$store.commit('general/setAltPanel', v);
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
    closeBox() {
      this.$store.commit('general/closeWindsPanel');
    },
    openAltitudePanel() {
      // todo: find a better method to take into account the possibility that the user is onboard
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
    },
    setAltitude(alt) {
      this.$store.commit('flightSimulator/setAltitudeLevel', alt);
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
$elemHeight: 30px;
.info-box.winds-panel {
    //top: calc(#{$marginBase} + #{$itemWidth*3} + #{$marginItem * 4});
    width: 244px;
    @include medium_down {
        left: 0;
        height: 100px;
        width: 32px;
        flex-flow: column;
        top: -100px;
    }
    .body,
    .box-footer {
        padding: 20px;
    }
    .altitude-panel {
        padding-top: $elemHeight;
        .panel-title{
            text-transform: uppercase;
            text-align: center;
        }
    }
    .altitude-panel-inner {
        display: flex;
        padding-top: $marginItem;
        position: relative;
        > div {
            flex: 1 0 auto;
            font-size: 14px;
            span {
                display: block;
            }
            color: $gray;
            > div {
                min-height: $elemHeight;
                line-height: $elemHeight;
            }
        }
        .--description {
            font-size: 10px;
            text-align: right;
            text-transform: uppercase;
            > div {
                position: relative;
                cursor: pointer;
                &.stratosphere {margin-top: $elemHeight*2;}
                &.troposphere {margin-top: $elemHeight;}
                &.isActive {color: #FFF;}
            }
            span{
                position: absolute;
                text-transform: none;
                top: 12px;
                right: 0;
            }
        }
        .--slider {
            width: 28px;
            flex: 0 0 auto;
            position: relative;
            padding-left: 4px;
            .input-wrapper {
                transform: rotate(-90deg);
                transform-origin: 98px 105px;
                width: 195px;
            }
            input[type=range] {
                -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
                width: 100%; /* Specific width is required for Firefox. */
                background: transparent; /* Otherwise white in Chrome */
            }
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
            }
            input[type=range]:focus {
                outline: none; // Removes the blue border.
            }
            input[type=range]::-ms-track {
                width: 100%;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background: #ffffff;
                cursor: pointer;
                margin-top: -5px; // need to specify a margin in Chrome
            }
            input[type=range]::-moz-range-thumb {
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background: #ffffff;
                cursor: pointer;
            }
            input[type=range]::-ms-thumb {
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background: #ffffff;
                cursor: pointer;
            }
            input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 2px;
                cursor: pointer;
                background: $gray;
                border-radius: 1.3px;
            }
            input[type=range]:focus::-webkit-slider-runnable-track {
                background: $gray;
            }
            input[type=range]::-moz-range-track {
                width: 100%;
                height: 2px;
                cursor: pointer;
                background: $gray;
                border-radius: 1.3px;
            }
            input[type=range]::-ms-track {
                width: 100%;
                height: 2px;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                border-width: 16px 0;
                color: transparent;
            }
            input[type=range]::-ms-fill-lower {
                background: $gray;
            }
            input[type=range]:focus::-ms-fill-lower {
                background: $gray;
            }
            input[type=range]::-ms-fill-upper {
                background: $gray;
            }
            input[type=range]:focus::-ms-fill-upper {
                background: $gray;
            }
        }
        .--altitudes {
            >div {
                cursor: pointer;
                &.isActive {
                    color: #FFF;
                }
            }
        }
    }
    p {
        font-size: 11px;
        color: $gray;
        text-align: center;
        margin-top: 15px;
    }
    .box-footer {
        padding-top: 0;
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
                display: flex;
                justify-content: center;
                padding: $marginItem;
            }
        }
    }
}
</style>
