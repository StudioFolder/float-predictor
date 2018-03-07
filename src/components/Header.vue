<template>
    <div class="site-header" :class="{'is-onboard': isOnboard}">
        <main-menu :is-choosing="isChoosing"  />
        <nav-brand :is-choosing="isChoosing" />
    </div>
</template>
<script>
import mainMenu from 'Parts/MainMenu';
import navBrand from 'Parts/NavBrand';

export default {
  components: {
    mainMenu, navBrand,
  },
  computed: {
    isOnboard() { return this.$store.state.flightSimulator.focusedExplorer > 0; },
    isChoosing() { return this.$store.state.general.isChoosingDestination; },
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import"~css/_typography.scss";
@include between($medium, $large) {
    body.flight-simulator .main-application.choosing-destination .site-header {
        // z-index: 14;
    }
}
.site-header {
    position: relative;
    z-index: 20;
    background: transparent;
    @include large_down {
        position: fixed;
        top: 0;
        height: 80px;
        width: 100%;
        background: black;
        &.is-onboard {
            display: none;
        }
    }
    .nav-brand {
        color: #fff;
        display: block;
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        padding: $marginBase;
        transition: opacity .2s ease;
        @include large_down {
            padding: 1rem $marginMobile $marginMobile;
        }
    }
    .logo {
        @extend %colfax_bold;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem; // 24px

        .title {
            color: #FFF;
        }
        .subtitle {
            @include medium_up{
                margin-bottom: 2.625rem; // 42px
            }
            color: $gray;
        }
        @include down($xlarge) {
            font-size: 1.2rem;
        }
        @include medium_down {
            position: fixed;
            top: $marginMobile;
            left: $marginMobile;
            text-align: left;
            font-size: 1rem;
        }
        @include medium_down {
            transform: translateY(-25%);
        }
    }
    .read-more {
        margin-top: 1.5rem;
        display: none;
        @include down($xlarge) {
            font-size: .85em;
        }
    }
    &.--pages .nav-brand {
        opacity: 1;
        .intro-description {
            max-width: 230px;
            @include down($xlarge) {
                font-size: .85em;
            }
            @include medium_down {
                display: none;
            }
        }
        .read-more {
            display: block;
            @include medium_down {
                display: none;
            }
        }
    }
    &.--home .nav-brand {
        opacity: 1;
        text-align: center;
        top: 10%;
        @include medium_up {
            left: 50%;
            transform: translateX(-50%);
        }
        .intro-description {
            @extend .h4;
            @include medium_up {
                max-width: 450px;
            }
            @include medium_down {
                text-align: left;
                font-size: 1em;
                line-height: 1.45;
            }
        }
    }
}
</style>
