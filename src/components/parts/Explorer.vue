<template>
    <li class="nav-item explorer-item --rounded"
        :style="{opacity: opacity}"
        @click="onClick"
        @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="explorer-id">
            <div v-if="(hover || highlighted)" class="explorer-gif">
                <img src="~img/explorer_anim.gif">
            </div>
            <div v-else>{{explorer}}</div>
        </div>
        <svg>
            <circle class="progress" :style="{ strokeDasharray: dashArray }"></circle>
            <circle class="baseline"></circle>
            <!--<circle class="handicap" :style="{ strokeDasharray: dashArray }"></circle>-->
        </svg>
    </li>
</template>

<script>
export default {
  name: 'explorer',
  props: ['id', 'explorer', 'day'],
  data() {
    return {
      r: 17, // calc(#{$itemwidth}/2 + 1px ); // raggio definitivo 15
      opacity: 0,
      hover: false,
    };
  },
  computed: { // ${this.circumference * ((this.id) / 16)}
    circumference() { return this.r * 2 * Math.PI; },
    highlighted() {
      return (this.$store.state.flightSimulator.focusedExplorer === this.explorer);
    },
    dashArray() {
      if (this.id === 0) {
        return `${this.circumference * ((this.day) / 16)}, 10000`;
      }
      return `0, ${this.circumference * ((this.id) / 16)}, ${this.circumference * ((this.day - this.id) / 16)}, 10000`;
    },
  },
  methods: {
    onClick() {
      this.$store.commit('flightSimulator/setFocusedExplorer', this.explorer);
    },
    mouseEnter() {
      this.hover = true;
    },
    mouseLeave() {
      this.hover = false;
    },
  },
  watch: {
    day(day) {
      if (day >= this.explorer) {
        this.opacity = 1;
      }
    },
  },
};
</script>

<style lang="scss">
</style>
