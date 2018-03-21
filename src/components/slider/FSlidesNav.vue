<template>
    <div class="f-slider-nav">
        <div class="f-bullet-pagination paragraph paragraph-1">
            <bullet-nav v-for="(slide, i) in paragraphs[0]"
                :key="i"
                :i="i"
                :currentSlide="currentSlide"
                :currentIndex="currentIndex"
                :currentParagraph="currentParagraph"
                :slide="slide"
                @navSelectSlide="onNavSelectSlide">
            </bullet-nav>
        </div>
        <div class="f-bullet-pagination paragraph paragraph-1">
            <bullet-nav v-for="(slide, i) in paragraphs[1]"
                        :key="i"
                        :i="i"
                        :currentSlide="currentSlide"
                        :currentIndex="currentIndex"
                        :currentParagraph="currentParagraph"
                        :slide="slide"
                        @navSelectSlide="onNavSelectSlide">
            </bullet-nav>
        </div>
        <div class="f-bullet-pagination paragraph paragraph-1">
            <bullet-nav v-for="(slide, i) in paragraphs[2]"
                        :key="i"
                        :i="i"
                        :currentSlide="currentSlide"
                        :currentIndex="currentIndex"
                        :currentParagraph="currentParagraph"
                        :slide="slide"
                        @navSelectSlide="onNavSelectSlide">
            </bullet-nav>
        </div>
    </div>
</template>

<script>
import BulletNav from './FBullet';

export default {
  components: { BulletNav },
  name: 'f-slides-nav',
  props: ['currentIndex', 'slides', 'currentSlide', 'paragraphs'],
  computed: {
    currentParagraph() {
      return parseInt(this.currentSlide / 100, 10);
    },
  },
  methods: {
    onNavSelectSlide(slide) {
      this.$emit('navSelectSlide', slide);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.f-slider-nav {
    flex: 0 0 auto;
    display: flex;
    flex-flow: column;
    justify-content: center;

    .f-bullet-pagination {
        position: relative;
        min-height: 20px;
        display: flex;
        flex-flow: column;
        margin-bottom: 20px;
        .fslider-nav-item {
            cursor: pointer;
            background-color: $gray;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            margin-bottom: 16px;
            transition: all .3s ease;
            border: 2px solid transparent;
            &.hidden-paragraph {
                position: absolute;
                background-color: transparent;
                border-color: $gray;
            }
            &.isActive {
                background-color: #FFF;
            }
        }
        &:after {
            content: '';
            display: table;
            clear: both;
        }
    }
}
</style>
