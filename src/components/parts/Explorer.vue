<template>
    <li class="nav-item explorer-item --rounded" :style="{opacity: opacity}">
        <div class="explorer-id">
            {{explorer}}
        </div>
        <svg>
            <circle class="progress" :style="{ strokeDashoffset: dashOffset }"></circle>
            <circle class="handicap" :style="{ strokeDasharray: dashArray }"></circle>
        </svg>
    </li>
</template>

<script>
export default {
  name: 'explorer',
  props: ['id', 'explorer', 'day'],
  data() {
    return {
      r: 17, // calc(#{$itemwidth}/2 + 1px );
      speed: 0.10, // todo: speed_d_x_sec
      opacity: 0,
    };
  },
  computed: {
    circumference() { return this.r * 2 * Math.PI; },
    dashOffset() { return this.circumference * ((16 - this.day) / 16); },
    dashArray() { return `${this.circumference * ((this.id) / 16)}, 1000`; },
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
@import "~@/assets/css/_variables_and_mixins.scss";
$r: calc(#{$itemWidth}/2 + 2px );
$pi: 3.14159;

.explorer-item {
    margin-bottom: 1rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .3s;

    .explorer-id {
        position: absolute;
        z-index: 10;
    }
    svg {
        height: calc(#{$itemWidth} + 10px);
        width: calc(#{$itemWidth} + 10px);
        transform: rotate(-86deg);
        position: absolute;
    }
    circle {
        cx: 50%;
        cy: 50%;
        r: $r;
        fill: transparent;
        &.handicap {
            stroke-width: 4;
            stroke: $bodyColor;
            transform: rotate(-1deg);
        }
        &.progress {
            stroke-width: 2;
            stroke-linecap: square;
            stroke-dasharray: calc(#{$r} * 2 * #{$pi}); // circumference
            stroke-dashoffset: calc(#{$r} * 2 * #{$pi});
            stroke: $textColor;
            transform: rotate(1deg);
            transition: stroke-dashoffset 10s; // depends on speed
        }
    }
}
</style>
