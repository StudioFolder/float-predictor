<template>
    <div class="altitude-selector-group">
        <div class="input-group altitude-select">
            <label class="small">Float Altitude</label>
            <div class="alt-select" @click="toggleAltPanel">
                <span>{{ altValues[selectedAlt] }}</span>
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
<!--        <p class="input-label">
            Aerocene sculptures always leave at noon with sun light.
        </p>-->
    </div>
</template>

<script>
import altitudePanel from './AltitudePanel';

export default {
  name: 'altitude-selector',
  components: { altitudePanel },
  data() {
    return {
      altValues: ['100 m', '1,500 m',
        '5,500 m', '10,000 m', '16,000 m',
        '21,500 m', '26,500 m',
      ],
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
  },
  methods: {
    closeAltPanel() {
      this.isAltPanelOpen = false;
    },
    toggleAltPanel() {
      this.isAltPanelOpen = !this.isAltPanelOpen;
    },
    setAltitude(alt) {
      this.altitudeLevel = alt;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
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
        label {
            margin-top: -15px;
            margin-bottom: 5px;
        }
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
        bottom: -210px;
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
        animation: select-slide-up .25s ease-in-out;
        @include small_up {
            animation: select-slide-down .25s ease-in-out;
            width: 93px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 16px;
            }
        }
    }
    .select-slide-leave-active {
        animation: select-slide-up .25s ease-in-out reverse;
        @include small_up {
            animation: select-slide-down .25s ease-in-out reverse;
            width: 93px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 16px;
            }
        }
    }
}
</style>
