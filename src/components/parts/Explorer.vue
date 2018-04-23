<template>
    <li class="nav-item explorer-item --rounded"
        :class="{'--focused': highlighted}"
        :style="{'opacity': opacity, 'visibility': visibility}"
        @click="onClick"
        @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="explorer-id">
            <div v-if="(hover || highlighted)" class="explorer-gif">
                <img src="~img/explorer_anim_03.gif">
            </div>
            <div v-else>{{explorer}}</div>
        </div>
        <svg>
            <circle cx="50%"
                    cy="50%"
                    r="13px"
                    :data-explorer="id"
                    class="progress"
                    :stroke-dasharray="dashArray"
                    :stroke="color">
            </circle>
            <circle cx="50%"
                    cy="50%"
                    r="13px"
                    class="baseline"></circle>
        </svg>
        <transition name="fade">
            <div v-if="(hover && !isFlightOver)" class="hover-text" key="onboard">
                Board Sculpture {{explorer}}
            </div>
            <div v-else-if="(hover && isFlightOver)" class="hover-text" key="sculpture">
                Sculpture {{explorer}}
            </div>
        </transition>
    </li>
</template>

<script>
export default {
  name: 'explorer',
  props: ['id', 'explorer', 'day'],
  data() {
    return {
      r: 15, // synchronize with css for animation
      opacity: 0,
      visibility: 'hidden',
      hover: false,
    };
  },
  computed: { // ${this.circumference * ((this.id) / 16)}
    circumference() { return this.r * 2 * Math.PI; },
    highlighted() {
      return (this.$store.state.flightSimulator.focusedExplorer === this.explorer
              || this.$store.state.flightSimulator.selectedExplorer === this.explorer
      );
    },
    dashArray() {
      if (this.id === 0) {
        return `${this.circumference * ((this.day) / 16)}, 10000`;
      }
      return `0, ${this.circumference * ((this.id) / 16)}, ${this.circumference * ((this.day - this.id) / 16)}, 10000`;
    },
    color() {
      return (this.$store.state.general.webColors[this.id]);
    },
    isFlightOver() {
      return (this.$store.state.flightSimulator.visualizationState === 4);
    },
  },
  methods: {
    onClick() {
      this.$store.commit('flightSimulator/setFocusedExplorer', this.explorer);
      this.$store.commit('flightSimulator/setPlaying', true);
      if (this.isFlightOver) {
        this.hightlightedExplorer = this.explorer;
        this.$store.commit('flightSimulator/setSelectedExplorer', this.explorer);
      }
    },
    mouseEnter() {
      this.hover = true;
      this.$store.commit('flightSimulator/setSelectedExplorer', this.explorer);
      if (this.isFlightOver) {
        this.hightlightedExplorer = this.$store.state.flightSimulator.focusedExplorer;
        this.$store.commit('flightSimulator/setFocusedExplorer', this.explorer);
      }
    },
    mouseLeave() {
      this.hover = false;
      if (!this.isFlightOver) {
        this.$store.commit('flightSimulator/setSelectedExplorer', 0);
      } else {
        this.$store.commit('flightSimulator/setSelectedExplorer', this.hightlightedExplorer);
        this.$store.commit('flightSimulator/setFocusedExplorer', this.hightlightedExplorer);
      }
    },
  },
  watch: {
    day(day) {
      this.opacity = (day >= this.explorer) ? 1 : 0;
      this.visibility = (day >= this.explorer) ? 'visible' : 'hidden';
    },
  },
};
</script>
