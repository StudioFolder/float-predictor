<template>
    <div class="main-nav">
        <div class="header">
            <div class="close" @click="closeAction">
                <i class="fp fp-close-w"></i>
            </div>
            <div class="brand"></div>
        </div>
        <div class="body">
            <div class="menu-section">
                <ul class="list-group menu-items">
                    <li>About</li>
                    <li>Aeroglyphs archive</li>
                    <li>Aerocene explorer</li>
                    <li>Resources and APIs</li>
                    <li>Instructions</li>
                    <li>Impressum</li>
                    <li>Disclaimer</li>
                </ul>
            </div>
            <div class="menu-section">
                <ul class="list-group link-items">
                    <li>aerocene.org</li>
                    <li>forum</li>
                </ul>
            </div>
            <div class="menu-section">
                &copy; All rights reserved.<br>
                Studio Tomás Saraceno {{currentYear}}
            </div>
            <div class="menu-section">
                <ul class="list-group horiziontal share-items">
                    <li>F</li>
                    <li>T</li>
                    <li>G</li>
                    <li>M</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'main-nav',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  methods: {
    closeAction() { this.$store.commit('general/toggleMenu'); },
  },
};
</script>

<style lang="scss">
    @import "~@/assets/css/_variables_and_mixins.scss";
    .main-nav {
        background-color: $lightBlack;
        padding: $marginBase;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        z-index: 10;
    }
</style>
