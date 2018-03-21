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
                        <div class="column --slider" :class="'alt-'+altitudeLevel"></div>
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
  computed: {
    altitudeLevel() {
      return this.$store.state.flightSimulator.altitudeLevel;
    },
  },
  methods: {
    closeBox() {
      this.$store.commit('general/closeWindsPanel');
    },
    openAltitudePanel() {
      // this.$store.commit('flightSimulator/setPlaying', false);
      this.isAltPanelOpen = true;
    },
    setAltitude(alt) {
      this.$store.commit('flightSimulator/setAltitudeLevel', alt);
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
$elemHeight: 30px;
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
        padding-top: $elemHeight;
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
            width: 1px;
            flex: 0 0 1px;
            background-color: $gray;
            margin: 0 $marginItem*2;
            &:after {
                content: '';
                display: block;
                width: 12px; height: $elemHeight;
                margin-left: -5px;
                border-radius: 50%;
                transition: transform .2s ease;
                /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#f7f7f7+0,d6d6d6+50,e5e5e5+100&0+36,1+37,1+63,0+64 */
                background: -moz-linear-gradient(top,
                        rgba(247,247,247,0) 0%, rgba(223,223,223,0) 36%,
                        rgba(222,222,222,1) 37%, rgba(214,214,214,1) 50%,
                        rgba(218,218,218,1) 63%, rgba(218,218,218,0) 64%,
                        rgba(229,229,229,0) 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(top,
                        rgba(247,247,247,0) 0%,rgba(223,223,223,0) 36%,
                        rgba(222,222,222,1) 37%,rgba(214,214,214,1) 50%,
                        rgba(218,218,218,1) 63%,rgba(218,218,218,0) 64%,
                        rgba(229,229,229,0) 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom,
                        rgba(247,247,247,0) 0%,rgba(223,223,223,0) 36%,
                        rgba(222,222,222,1) 37%,rgba(214,214,214,1) 50%,
                        rgba(218,218,218,1) 63%,rgba(218,218,218,0) 64%,
                        rgba(229,229,229,0) 100%); /* IE10+, FF16+, Chrome26+, Opera12+, Safari7+*/
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00f7f7f7',
                        endColorstr='#00e5e5e5',GradientType=0 ); /* IE6-9 */
            }
            &.alt-6:after{ transform: translateY(0);
            }
            &.alt-5:after{ transform: translateY($elemHeight);
            }
            &.alt-4:after{ transform: translateY($elemHeight*2);
            }
            &.alt-3:after{ transform: translateY($elemHeight*3);
            }
            &.alt-2:after{ transform: translateY($elemHeight*4);
            }
            &.alt-1:after{ transform: translateY($elemHeight*5);
            }
            &.alt-0:after{ transform: translateY($elemHeight*6);
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
        font-size: 10px;
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
