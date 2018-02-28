<template>
    <nav class="nav-brand">
        <div class="logo">
            <div class="title">Aerocene</div><div class="subtitle">Float Predictor</div>
        </div>
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
            <router-link to="/about" class="read-more">read more</router-link>
        </div>
        </transition>
    </nav>
</template>
<script>
export default {
  name: 'nav-brand',
  props: ['isChoosing'],
  computed: {
    isDescriptionActive() {
      return (this.isChoosing &&
        (this.$route.name === 'flight-simulator' || this.$route.name === 'home-page'));
    },
  },
};
</script>
