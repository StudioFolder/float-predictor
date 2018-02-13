<template>
    <nav class="nav-brand">
        <div class="logo">
            <div class="title">Aerocene</div><div class="subtitle">Float Predictor</div>
        </div>
        <p class="intro-description"
           v-if="isDescriptionActive">
            Travel around the earth lifted only by the sun,
            carried only by the wind,
            towards a clean and sustainable future.
        </p>
        <div v-if="isDescriptionActive">
            <router-link to="/about" class="read-more">read more</router-link>
        </div>
    </nav>
</template>
<script>
export default {
  name: 'navigation',
  computed: {
    isDescriptionActive() {
      return !this.$store.state.flightSimulator.isActive;
    },
  },
};
</script>
<style lang="scss">
    @import "~css/_variables_and_mixins.scss";
    @import"~css/_typography.scss";
    .nav-brand {
        color: #fff;
        display: block;
        opacity: 0;
        position: fixed;
        top: 0;
        left: 0;
        padding: $marginBase;
        transition: opacity .2s ease;

        .intro-description {
            max-width: 300px;
        }
        &.--pages {
            opacity: 1;
        }
        &.--home {
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
                    max-width: 500px;
                }
                @include medium_down {
                    text-align: left;
                }
            }
        }
    }
    .logo {
        @extend %colfax_med;
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem; // 24px
        .title {
        }
        .subtitle {
            @include medium-up{
                margin-bottom: 2.625rem; // 42px
            }
            color: $gray;
        }
        @include medium_down {
            position: fixed;
            top: $marginBase;
            left: $marginBase;
            text-align: left;
            transform: translateY(-25%);
            font-size: 1rem;
        }
    }
    .read-more {
        margin-top: 1.5rem;
        display: none;
    }
    .choosing-destination {
        .read-more,
        .intro-description {
            display: block;
            @include medium_down {
                display: none;
            }
        }
    }
</style>
