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
.site-header {
    position: fixed;
    @include medium_down {
        position: absolute;
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
        @include medium_down {
            padding: 1rem $marginMobile $marginMobile;
        }
    }
    .logo {
        @extend %colfax_bold;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem; // 24px
        .subtitle {
            @include medium-up{
                margin-bottom: 2.625rem; // 42px
            }
            color: $gray;
        }
        @include medium_down {
            position: fixed;
            top: $marginMobile;
            left: $marginMobile;
            text-align: left;
            transform: translateY(-25%);
            font-size: 1rem;
        }
    }
    .read-more {
        margin-top: 1.5rem;
        display: none;
    }
    &.--pages .nav-brand{
        opacity: 1;
        .intro-description {
            max-width: 230px;
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
    &.--home .nav-brand{
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
                max-width: 400px;
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
