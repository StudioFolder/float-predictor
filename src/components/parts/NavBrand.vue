<template>
    <nav class="nav-brand">
        <router-link to="/flight-simulator">
            <div class="logo" id="fp-logo">
                <img src="~img/float_predictor_logo.svg"
                     alt="logo aerocene float predictor"
                     @click="startNew">
            </div>
        </router-link>
        <transition name="fade">
        <p class="intro-description"
           v-if="isDescriptionActive">
            Travel around the earth lifted only by the sun,
            carried only by the wind,
            towards a clean and sustainable future.
        </p>
        </transition>
        <transition name="fade">
        <div v-if="isDescriptionActive">
            <a href="#"
               @click.prevent v-b-modal.instruction-modal
               class="read-more">how to float</a>
        </div>
        </transition>
    </nav>
</template>
<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
export default {
  name: 'nav-brand',
  props: ['isChoosing'],
  computed: {
    isDescriptionActive() {
      return (this.isChoosing &&
        (this.$route.name === 'flight-simulator' || this.$route.name === 'home-page'));
    },
  },
  methods: {
    startNew() {
      if (this.$store.state.flightSimulator.isActive) {
        this.$dialog.confirm('This Action will reset the current simulation and start a new one. Please confirm to continue')
          .then(() => {
            this.initNew();
          });
      } else {
        this.initNew();
      }
    },
    initNew() {
      this.$store.dispatch('flightSimulator/resetVisualization');
      this.$store.commit('general/toggleMenu');
      this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('general/setFormStatus', true);
      this.$store.commit('general/setModalShow', true);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/css/_variables_and_mixins.scss";
.nav-brand {
    .logo {
        width: 165px;
        margin-bottom: 33px;
        img{
            max-width: 100%;
        }
        @include small_down {
            width: 120px;
        }
    }
    .logo.to-top {
        top: -50px;
    }
}
</style>
