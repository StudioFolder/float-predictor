<template>
    <!-- Modal Component -->
    <b-modal id="instruction-modal" class="instruction-modal"
             centered hide-footer size="lg" title="How To Float">
        <i slot="modal-header-close" class="fp fp-close"></i>
        <f-slider />
    </b-modal>
</template>

<script>
import fSlider from 'Components/slider/FSlider';

export default {
  name: 'instruction-modal',
  components: { fSlider },
  computed: {
    sectionTitle() {
      let title = '';
      switch (this.activeIndex) {
        case 0:
          title = 'Becoming Aerosolar';
          break;
        case 1:
          title = '2—How to Float';
          break;
        case 2:
          title = '3—After Journey';
          break;
        default:
          title = '';
      }
      return title;
    },
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
$lateralSpace: 7rem;
$lateralSpaceMobile: .5rem;
.instruction-modal {
    .modal-dialog {
        max-width: 1024px;
        @include medium_down {
            margin: 0;
        }
    }
    .carousel-indicators {
        bottom: -25px;
        li {
            height: 10px;
            width: 10px;
            border-radius: 50%;
            margin: 0 10px;
        }
    }
}
.instructions-sections {
    display: flex;
    justify-content: space-between;
    padding-left: $lateralSpace;
    padding-right: $lateralSpace;
    margin-top: -$marginBase/2;
    @include medium_down {
        padding-left: $lateralSpaceMobile;
        padding-right: $lateralSpaceMobile;
        margin-top: 0;
    }
    .main-pagination-wrapper {
        font-size: .8em;
        padding-top: 5px;
    }
    .sections {
        color: $gray;
        @include small_down {
            display: none;
        }
    }
    .section-title {
        width: 50%;
        text-align: left;
        color: $gray;
    }
    .main-pagination {
        width: 50%;
        text-align: right;
    }
}
.internal-slider .swiper-slide {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    padding-left: $lateralSpace;
    padding-right: $lateralSpace;
    @include medium_down {
        padding-left: $lateralSpaceMobile;
        padding-right: $lateralSpaceMobile;
    }
    .title {
        flex: 0 0 auto;
        margin: $marginItem 0;
        @include small_down {
            margin: $marginItem*2 0 $marginItem;
        }
    }
    .animation-wrapper {
        text-align: center;
        flex: 1 1 auto;
        height: 40%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        .animation {
            max-height: 100%;
            max-width: 100%;
            text-align: center;
            &.--big {
                max-width: 130%;
                width: 130%;
                height: auto;
                margin-left: -15%;
            }
        }
    }
    .description {
        flex: 0 0 auto;
        padding: .5em 0;
        overflow: hidden;
        max-width: 35em;
        @include small_down {
            max-width: unset;
            font-size: .9em;
        }
        &.--upper {
            margin-top: 1em;
        }
    }
}
.how-aerocene-float {
    .animation-wrapper {
        margin-right: -90px;
        margin-top: -10px;
    }
    .--subtitle{
        margin-bottom: -90px;
    }
}
.nav-icon {
    position: absolute;
    bottom: 30px;
    left: 50%;
    z-index: 9;
    text-align: center;
    transform: translateX(-50%);
    color: $gray;
    &.--down {
        cursor: pointer;
    }
    @include small_down {
        bottom: 15px;
    }
}
.scroll-icon {
    position: relative;
    width: 100%;
    i {margin: 0 auto}
}
.main-pagination {
    .swiper-pagination-bullet {
        background: transparent;
        border-radius: 0;
        margin-left: .5em;
        height: 20px;
        width: 20px;
    }
}
*[class^="internal-pagination"] {
    position: absolute;
    height: 600px;
    top: 0;
    right: 0.5rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    z-index:10;
    @include medium_down {
        display: none;
    }
    .swiper-pagination-bullet {
        background-color: #fff;
        opacity: .4;
        margin: .5em 0;
    }
    .swiper-pagination-bullet-active {
        opacity: 1;
    }
}
</style>
