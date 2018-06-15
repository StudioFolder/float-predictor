<template>
    <span :style="{top: marginTop, zIndex: 20 - i}"
          :class="{'isActive': isActive, 'hidden-paragraph' : isHidden}"
          class="fslider-nav-item"
          @click="onClick">
    </span>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
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
