<template>
    <li class="nav-item explorer-item --rounded"
        :class="{'--focused': highlighted}"
        :style="{opacity: opacity}"
        @click="onClick">
        <div class="explorer-id">
            <transition name="fade" mode="out-in">
                <div v-if="(highlighted)" class="exit-from-onboard" key="close">
                    <i class="fp fp-close"></i>
                </div>
                <div v-else key="explorer-id">{{explorer}}</div>
            </transition>
        </div>
        <svg>
            <circle class="baseline"></circle>
            <circle
                    :data-explorer="id"
                    class="progress"
                    :style="{ strokeDasharray: dashArray, stroke: color }">
            </circle>
        </svg>
    </li>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  name: 'explorer',
  props: ['id', 'explorer', 'day'],

  data() {
    return {
      r: 25, // synchronize with css for animation
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
      if (this.highlighted) {
        this.$store.commit('flightSimulator/setFocusedExplorer', 0);
        this.$store.commit('flightSimulator/setPlaying', true);
      } else {
        this.$store.commit('flightSimulator/setFocusedExplorer', this.explorer);
        this.$store.commit('flightSimulator/setPlaying', true);
      }
    },
  },
  watch: {
    day(day) {
      this.opacity = (day >= this.explorer) ? 1 : 0;
    },
  },
};
</script>
