<template>
    <div class="f-slider instructions-slider" id="instructions-slider" ref="wrapper">
        <f-slides-wrapper :currentIndex="currentIndex"
                          :height="height"
                          @scrollDown="onScrollDown"
                          @scrollUp="onScrollUp"/>
        <f-slides-nav @navSelectSlide="onNavSelectSlide"
                :slides="slides"
                :currentIndex="currentIndex" />
    </div>
</template>

<script>
import fSlidesWrapper from 'Components/slider/FSlidesWrapper';
import fSlidesNav from 'Components/slider/FSlidesNav';
import { TweenLite } from 'gsap';
// eslint-disable-next-line
import ScrollToPlugin from 'gsap/ScrollToPlugin';

export default {
  name: 'f-slider',
  components: { fSlidesWrapper, fSlidesNav },
  data() {
    return {
      currentIndex: 0,
      slides: [101, 102, 103, 201, 202, 203, 204, 205, 206, 301, 302, 303],
      scrollingTo: 0,
      animating: false,
      height: '',
    };
  },
  computed: {
    nextIndex() {
      if (this.currentIndex === (this.slides.length - 1)) {
        return this.currentIndex;
      }
      return this.currentIndex + 1;
    },
    previousIndex() {
      if (this.currentIndex === 0) {
        return 0;
      }
      return this.currentIndex - 1;
    },
  },
  methods: {
    indexUpdate() {
      this.animating = false;
      this.currentIndex = this.scrollingTo;
    },
    onScrollDown() {
      if (!this.animating) {
        this.scrollingTo = this.nextIndex;
      }
    },
    onScrollUp() {
      if (!this.animating) {
        this.scrollingTo = this.previousIndex;
      }
    },
    onNavSelectSlide(newIndex) {
      if (!this.animating) {
        this.scrollingTo = newIndex;
      }
    },
    handleScroll(scrollHeight) {
      TweenLite.to('.f-slider-inner', 0.4, {
        top: scrollHeight,
        ease: 'linear',
        onComplete: this.indexUpdate,
      });
    },
    findPosition(i) {
      const id = this.slides[i];
      return document.querySelector(`#slide${id}`).offsetTop;
    },
  },
  watch: {
    scrollingTo(newIndex) {
      this.animating = true;
      const height = this.findPosition(newIndex);
      this.handleScroll(-height);
    },
  },
  mounted() {
    this.height = `${this.$refs.wrapper.clientHeight}px`;
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.f-slider.instructions-slider {
    position: relative;
    display: flex;
    max-width: 100%;
    height: 100%;
    flex-flow: row;
    .f-slider-wrapper {
        flex: 1 1 100%;
        overflow: hidden;
        position: relative;
        padding-right: 2rem;
        .f-slider-inner {
            position: absolute;
            top: 0;
            left: 0;
            right: 2rem;
        }
        .f-slide {
            height: 100%;
        }
    }
    .f-slider-nav {
        flex: 0 0 auto;
        display: flex;
        flex-flow: column;
        justify-content: center;
    }
    .f-bullet-pagination {
        li {
            cursor: pointer;
            background-color: $gray;
            border-radius: 50%;
            width: 8px;
            height: 8px;
            margin-bottom:12px;
            transition: background-color .4s ease;
            &.isActive {
                background-color: #FFF;
            }
        }
    }
}
</style>
