<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" class="instruction-modal"
             centered hide-footer size="lg" title="Instructions">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <div class="instructions-sections">
            Sections
            <span @click="changeSlide(0)">1</span>
            <span @click="changeSlide(1)">2</span>
            <span @click="changeSlide(2)">3</span>
            <span @click="changeSlide(3)">4</span>
        </div>

        <!-- swiper -->
        <swiper :options="swiperOption">
            <swiper-slide>
                <video>
                    <source src="/static/video/instructions_1-2.mp4" type="video/mp4">
                </video>
            </swiper-slide>
            <swiper-slide>
                <video>
                    <source src="/static/video/instructions_1-3.mp4" type="video/mp4">
                </video>
            </swiper-slide>
            <swiper-slide>
                <video>
                    <source src="/static/video/instructions_2-1a.mp4" type="video/mp4">
                </video>
            </swiper-slide>
            <swiper-slide>
                <video>
                    <source src="/static/video/instructions_2-1b.mp4" type="video/mp4">
                </video>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

        <p class="mt-4">
            Slide #: {{ slide }}<br>
        </p>
    </b-modal>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'instruction-modal',
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      interval: 0,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
  methods: {
    onSlideStart() { // optional slide argument
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    changeSlide(val) {
      this.slide = val;
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
    .instructions-sections {
        display: flex;
        flex-flow: row;
        justify-content: flex-end;
        margin: 0 0 1em auto;
        span {
            width: 10px;
            margin-left: 20px;
            text-align: center;
            cursor: pointer;
        }
    }
    .carousel-control-next-icon {
    }
    .instruction-modal {
        .modal-dialog {
            margin-top: $marginBase;
            margin-bottom: 0;
        }
    }
</style>
