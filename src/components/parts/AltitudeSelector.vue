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
        <!--<transition name="select-slide">-->
            <div v-if="isAltPanelOpen"
                 class="alt-panel-wrapper"
                 @click="closeAltPanel">
                <altitude-panel :isFull="false">
                </altitude-panel>
            </div>

        <!--</transition>-->
        <p class="input-label">
            Aerocene sculptures always leave at noon with sun light.
        </p>
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
        '5,5000 m', '10,000 m', '16,000 m',
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
        bottom: -220px;
        left: 0;
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
        animation: select-slide-up .3s ease-in-out;
        @include small_up {
            animation: select-slide-down .3s ease-in-out;
            width: 90px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 0;
            }
        }
    }
    .select-slide-leave-active {
        animation: select-slide-up .2s ease-in-out reverse;
        @include small_up {
            animation: select-slide-down .3s ease-in-out reverse;
            width: 90px;
            overflow: hidden;
            > div {
                position: absolute;
                bottom: 0;
                width: 90px;
                left: 0;
            }
        }
    }
}
.switch-text-enter-active {
    animation: flip-up-from-bottom .4s ease;
}
.switch-text-leave-active {
    position: absolute;
    animation: flip-up-to-top .4s ease;
}
.fade-height-leave-active {
    animation: fadeHeight .4s ease;
    overflow: hidden;
}
.fade-height-enter-active {
    animation: fadeHeight .4s ease-in-out reverse;
    overflow: hidden;
}
@keyframes select-slide-up {
    0% {height: 0;}
    100% {height: 210px;}
}
@keyframes select-slide-down {
    0% {height: 0; bottom: 0;}
    100% {height: 210px; bottom: -210px;}
}
</style>
