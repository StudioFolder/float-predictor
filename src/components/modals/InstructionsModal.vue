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
            height: 100%;
        }
        .modal-content {
            height: calc(100% - 2*#{$marginBase});
            @include medium_down {
                height: 100%;
            }
        }
        .modal-body {
            // 100% modal height - header padding - line height
            height: calc(100% - (2*2rem) - (2.369rem*1.2))
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
    .f-slide {
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
                margin: $marginItem*2 0 $marginItem 0;
            }
            @media screen and (max-height: 600px){
                margin: 0 0 $marginItem 0;
            }
        }
        .animation-wrapper {
            text-align: center;
            flex: 1 1 auto;
            height: 40%;
            display: flex;
            flex-flow: column;
            justify-content: center;
            @include medium_down {
                height: unset;
            }
            .animation {
                max-height: 100%;
                max-width: 100%;
                text-align: center;
                @include medium_down {
                    max-width: unset;
                    max-height: unset;
                    width: 140%;
                    height: auto;
                    margin-left: -20%;
                }
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
                padding-bottom: 2rem;
            }
            &.--upper {
                margin-top: 1em;
            }
        }
    }
    @media screen and (max-height: 600px){
        #slide102, #slide201{
            .description {
                @media screen and (max-height: 600px){
                    padding-bottom: 1.2rem;
                }
            }
            img {
                width: 120%;
                margin-left: -10%;
            }
        }
    }
}
</style>
