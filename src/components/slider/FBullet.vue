<template>
    <span :style="{top: marginTop}"
          :class="{'isActive': isActive, 'hidden-paragraph' : isHidden}"
          class="fslider-nav-item"
          @click="onClick">
    </span>
</template>

<script>
export default {
  name: 'bullet-nav',
  props: ['i', 'slide', 'currentSlide', 'currentParagraph', 'currentIndex'],
  computed: {
    isActive() {
      return this.slide === this.currentSlide;
    },
    ownParagraph() {
      return parseInt((this.slide / 100), 10);
    },
    isHidden() {
      return (this.ownParagraph !== this.currentParagraph);
    },
    marginTop() {
      if (this.isHidden) {
        return '0px';
      }
      return `${this.i * 25}px`;
    },
  },
  methods: {
    onClick() {
      this.$emit('navSelectSlide', this.slide);
    },
  },
};
</script>
