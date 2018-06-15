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
        <i v-if="currentIndex!==(slides.length-1)" class="fp fp-caret-down"></i>
    </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import fSlidesWrapper from 'Components/slider/FSlidesWrapper';
import fSlidesNav from 'Components/slider/FSlidesNav';
import { TweenLite } from 'gsap';

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
    flex-flow: row wrap;
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
            top: 0px;
            padding: 1.5rem 0 1.5rem 3.5rem;
            background-color: $lightBlack;
            z-index: 5;
        }
        @media screen and (max-height: 600px){
            padding: .5rem 0 .5rem 3.5rem;
        }
    }
    .title-number {
        position: absolute;
        margin: $marginItem 0;
        @include small_down {
            margin: 0;
            padding-top: calc(#{$marginItem*2} + 2.95rem);
        }
        @media screen and (max-height: 600px){
            padding-top: 2.4rem;
        }
    }
    .f-slider-wrapper {
        flex: 1 1 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
        padding-right: 2rem;
        @include medium_down {
            padding-right: 1.5rem;
            padding-left: 3rem;
            padding-top: 3rem;
        }
        @media screen and (max-height: 600px){
            padding-top: 2.4rem;
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
    .fp-caret-down {
        position: absolute;
        bottom: -25px;
        left: 50%;
        animation: pulse .4s 1s;
        background-size: cover;
        @include medium_down {
            bottom: -20px;
        }
        @include small_down {
            //display: none;
            bottom: 0;
            width: .8em;
            height: .8em;
            min-width: unset;
            min-height: unset;
        }
    }
    @keyframes pulse {
        0% {transform: translateY(0)}
        10% {transform: translateY(-4px)}
        50% {transform: translateY(10px)}
        100% {transform: translateY(0)}
    }
}
</style>
