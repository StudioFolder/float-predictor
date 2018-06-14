<template>
    <div class="altitude-panel" key="panel">
        <div v-if="isFull" class="panel-title">Winds Altitude</div>
        <div class="altitude-panel-inner">
            <div v-if="isFull" class="column --description">
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
            <div v-if="isFull" class="column --slider" :class="'alt-'+altitudeLevel">
                <div class="input-wrapper">
                    <input type="range"
                           v-model="altitudeLevel"
                           min="0" max="6" step="1">
                </div>
            </div>
            <div class="column --altitudes">
                <div @click="setAltitude(6)"
                     :class="{ 'isActive': altitudeLevel === 6}">26,500 m
                </div>
                <div @click="setAltitude(5)"
                     :class="{ 'isActive': altitudeLevel === 5}">21,500 m</div>
                <div @click="setAltitude(4)"
                     :class="{ 'isActive': altitudeLevel === 4}">16,000 m</div>
                <div @click="setAltitude(3)"
                     :class="{ 'isActive': altitudeLevel === 3}">10,000 m</div>
                <div @click="setAltitude(2)"
                     :class="{ 'isActive': altitudeLevel === 2}">5,500 m</div>
                <div @click="setAltitude(1)"
                     :class="{ 'isActive': altitudeLevel === 1}">1,500 m</div>
                <div @click="setAltitude(0)"
                     :class="{ 'isActive': altitudeLevel === 0}">100 m</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'altitude-panel',
  props: {
    isFull: {
      type: Boolean,
    },
  },
  computed: {
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
    setAltitude(alt) {
      this.altitudeLevel = alt;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
$elemHeight: 30px;
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
.info-box.winds-panel .box-footer {
    flex-flow: column;
    padding-top: 30px;
}
</style>
