<template>
    <li class="nav-item explorer-item --rounded"
        :class="{'--focused': highlighted}"
        :style="{opacity: opacity}"
        @click="onClick">
        <div class="explorer-id">
            <div v-if="(hover || highlighted)" class="explorer-gif">
                <img src="~img/explorer_anim_03.gif">
            </div>
            <div v-else>{{explorer}}</div>
        </div>
        <svg>
            <circle
                    :data-explorer="id"
                    class="progress"
                    :style="{ strokeDasharray: dashArray, stroke: color }">
            </circle>
            <circle class="baseline"></circle>
        </svg>
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
    color() {
      return (this.$store.state.general.webColors[this.id]);
    },
  },
  methods: {
    onClick() {
      this.$store.commit('flightSimulator/setFocusedExplorer', this.explorer);
      this.$store.commit('flightSimulator/setPlaying', true);
    },
  },
  watch: {
    day(day) {
      this.opacity = (day >= this.explorer) ? 1 : 0;
    },
  },
};
</script>
