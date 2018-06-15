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
                <altitude-panel v-if="isAltPanelOpen"
                                key="panel"
                                :isFull="true">
                </altitude-panel>
                <div v-else-if="isOn"
                     class="button-container"
                     key="button">
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
                    simulation at the initial altitude of {{initialAltLevel}}.
                </p>
            </transition>
            <p class="small data-credits">
                Data source:
                <a target="_blank"
                    href="https://www.ncdc.noaa.gov/data-access/model-data/model-datasets/global-forcast-system-gfs">
                    GFS
                </a>
            </p>
        </div>
    </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import altitudePanel from 'Parts/AltitudePanel';

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
    closeBox() {
      this.$store.commit('general/closeWindsPanel');
    },
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
