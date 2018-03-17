<template>
    <div class="f-slider-nav">
        <ul class="f-bullet-pagination">
            <li v-for="(slide, i) in slides"
                :key="i"
                :class="{'isActive': i === currentIndex}"
                @click="onClick(i)">
                <span :aria-disabled="slide"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'f-slides-nav',
  props: ['currentIndex', 'slides'],
  methods: {
    onClick(i) {
      this.$emit('navSelectSlide', i);
    },
  },
};
</script>
