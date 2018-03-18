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
            <div class="type-selector-group">
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
            <p>Animated winds emphasise speed.<br>
                Static winds highlight stream patterns.</p>
            <transition name="fade" mode="out-in">
                <div v-if="isAltPanelOpen" class="altitude-panel" key="panel">
                    <div class="panel-title">Winds Altitude</div>
                    <div class="altitude-panel-inner">
                        <div class="column --description">
                            <div style="margin-top: 50px">stratosphere</div>
                            <div>tropopause<span>jet streams</span></div>
                            <div>troposphere</div>
                            <div>sea level</div>
                        </div>
                        <div class="column --slider"></div>
                        <div class="column --altitudes">
                            <div>26,500m</div>
                            <div>21,500m</div>
                            <div>16,000m</div>
                            <div>10,000m</div>
                            <div>5,500m</div>
                            <div>1,500m</div>
                            <div>100m</div>
                        </div>
                    </div>
                </div>
                <div v-else class="button-container" key="button">
                    <b-button @click="openAltitudePanel" v-if="!isAltPanelOpen" variant="primary">
                        Explore Winds
                    </b-button>
                </div>
            </transition>
        </div>
        <div class="box-footer">
            <p>Aerocene Sculptures normally float between 8,000 and 16,000 m.
                Here you can explore wind patterns in the atmosphere at different altitudes.
                This will temporarily pause the float simulation.
            </p>
            <p class="small data-credits">
                Data source: GFS
            </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'winds-panel',
  data() {
    return {
      isOn: true,
      isColor: false,
      isAltPanelOpen: false,
    };
  },
  methods: {
    closeBox() {
      this.$store.commit('general/closeWindsPanel');
    },
    openAltitudePanel() {
      this.$store.commit('flightSimulator/setPlaying', false);
      this.isAltPanelOpen = true;
    },
  },
  watch: {
    isOn(v) {
      if (v) {
        if (this.isColor) {
          this.$store.commit('flightSimulator/setWinds', 2);
        } else {
          this.$store.commit('flightSimulator/setWinds', 1);
        }
      } else {
        this.$store.commit('flightSimulator/setWinds', 0);
      }
    },
    isColor(v) {
      if (this.isOn) {
        if (v) {
          this.$store.commit('flightSimulator/setWinds', 2);
        } else {
          this.$store.commit('flightSimulator/setWinds', 1);
        }
      } else {
        this.$store.commit('flightSimulator/setWinds', 0);
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.info-box.winds-panel {
    top: calc(#{$marginBase} + #{$itemWidth*3} + #{$marginItem * 4});
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
        padding: 25px;
        .panel-title{
            text-transform: uppercase;
            text-align: center;
        }
    }
    .altitude-panel-inner {
        display: flex;
        padding-top: $marginItem;
        > div {
            flex: 1 0 auto;
            font-size: 14px;
            span {
                display: block;
            }
            color: $gray;
            > div {
                min-height: 25px;
                line-height: 25px;
            }
        }
        .--description {
            font-size: 10px;
            text-align: right;
            text-transform: uppercase;
            span{
                text-transform: none;
                margin-top: -12px;
            }
        }
        .--slider {
            width: 1px;
            flex: 0 0 1px;
            background-color: $gray;
            margin: 0 $marginItem;
        }
    }
    p {
        font-size: 10px;
        color: $gray;
        text-align: center;
        margin-top: 15px;
    }
    .box-footer p:not(.small) {
        color: #FFF;
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
        &.color-selector.--color {
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
.fp-winds-on,
.fp-winds-en,
.fp-no-winds {
    width: 30px;
}
</style>
