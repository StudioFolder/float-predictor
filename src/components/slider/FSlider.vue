<template>
    <div class="f-slider instructions-slider" id="instructions-slider">
        <h5 class="title-apice">{{ sectionTitle }}</h5>
        <h3 class="title-number">{{ sectionNumber }}</h3>
        <f-slides-wrapper :currentIndex="currentIndex"
                          @scrollDown="onScrollDown"
                          @scrollUp="onScrollUp"/>
        <f-slides-nav @navSelectSlide="onNavSelectSlide"
                :slides="slides"
                :paragraphs="paragraphs"
                :currentSlide="currentSlide"
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
      paragraphs: [
        [101, 102, 103],
        [201, 202, 203, 204, 205, 206],
        [301, 302, 303],
      ],
      scrollingTo: 0,
      animating: false,
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
    currentSlide() {
      return this.slides[this.currentIndex];
    },
    currentParagraph() {
      return parseInt(this.currentSlide / 100, 10);
    },
    sectionTitle() {
      let title = '';
      switch (this.currentParagraph) {
        case 1:
          title = 'Becoming Aerosolar';
          break;
        case 2:
          title = 'Starting a Journey';
          break;
        case 3:
          title = 'Saving an Aeroglyph';
          break;
        default:
          title = '';
      }
      return title;
    },
    sectionNumber() {
      const num = this.currentSlide - (this.currentParagraph * 100);
      return `${this.currentParagraph}.${num}`;
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
    onNavSelectSlide(newSlide) {
      if (!this.animating) {
        this.scrollingTo = this.slides.indexOf(newSlide);
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
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import"~css/_typography.scss";
.f-slider.instructions-slider {
    position: relative;
    display: flex;
    max-width: 100%;
    height: 100%;
    flex-flow: row;
    .title-apice {
        position: absolute;
        width: 100%;
        top: -20px;
        padding-left: 7rem;
        color: $gray;
        text-transform: uppercase;
        font-size: .85em;
        @include medium_down {
            top: 20px;
            padding-left: 3.5rem;
        }
    }
    .title-number {
        position: absolute;
        margin: $marginItem 0;
        @include small_down {
            margin: $marginItem*2 0 $marginItem;
            padding-top: 2.95rem;
        }
    }
    .f-slider-wrapper {
        flex: 1 1 100%;
        overflow: hidden;
        position: relative;
        padding-right: 2rem;
        @include medium_down {
            padding-right: 1.5rem;
            padding-left: 3rem;
            margin-top: 3rem;
        }
        .f-slider-inner {
            position: relative;
            height: 100%;
            width: 100%;
            @include medium_up {
                padding-right: 2rem;
            }
        }
        .f-slide {
            height: 100%;
        }
    }
}
</style>
