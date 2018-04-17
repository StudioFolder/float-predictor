<template>
    <div class="site-header">
        <transition name="fade">
            <main-menu v-if="isMenuVisible" :is-choosing="isChoosing" />
        </transition>
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
    isHome() { return this.$route.name === 'home-page'; },
    isMobile() {
      return (window.matchMedia('(max-width: 768px)').matches);
    },
    isMenuVisible() {
      return ((!this.isOnboard && this.isMobile) || !this.isMobile);
    },
  },
};
</script>
<style lang="scss">
@import "~css/_variables_and_mixins.scss";
@import"~css/_typography.scss";

.site-header {
    position: relative;
    z-index: 20;
    background-color: transparent;
    transition: top .3s ease-in-out;
    @include large_down {
        position: fixed;
        top: 0;
        height: 75px;
        width: 100%;
        &.is-onboard {
            display: none;
        }
    }
    &:before {
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        top: 0; left: 0;
        opacity: 0;
        width: 100%;
        z-index: -100;
        transition: opacity 0.4s;
        background: linear-gradient( to bottom,
                rgba(0,0,0,1) 0%,
                rgba(0,0,0,1) 40%,
                rgba(0,0,0,.9) 90%,
                rgba(0,0,0,0) 100%);
    }
    &.--scroll:before {
        opacity: 1;
    }
    &.to-top {
        top: -60px !important;
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
        transition: top .3s ease-in-out;

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
        .logo {
            margin: 0 auto;
        }
    }
    &.to-top {
        top: -60px;
    }
}
</style>
