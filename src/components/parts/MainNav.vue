<template>
    <div class="main-nav">
        <div class="header">
            <b-nav vertical>
                <b-nav-item @click="closeAction" class="--close --correction">
                    <i class="fp fp-close-w"></i></b-nav-item>
            </b-nav>
            <div class="menu-section">
                <ul class="list-group menu-items">
                    <li class="menu-item --logo"><img src="~img/globe_illustration.svg"></li>
                    <li class="menu-item --nav"><p>start a new<br>aerosolar journey</p></li>
                </ul>
            </div>
        </div>
        <div class="body">
            <div class="menu-section">
                <ul class="list-group menu-items">
                    <li class="menu-item --nav">About</li>
                    <li class="menu-item --nav">Aeroglyphs archive</li>
                    <li class="menu-item --nav">Aerocene explorer</li>
                    <li class="menu-item --nav">Resources and APIs</li>
                    <li class="menu-item --nav">Instructions</li>
                    <li class="menu-item --nav">Impressum</li>
                    <li class="menu-item --nav">Disclaimer</li>
                </ul>
            </div>
            <div class="menu-section">
                <ul class="list-group link-items">
                    <li class="menu-item --link">aerocene.org</li>
                    <li class="menu-item --link">forum</li>
                </ul>
            </div>
            <div class="menu-section">
                <small>&copy; All rights reserved.<br>
                    Studio Tomás Saraceno {{currentYear}}</small>
            </div>
            <div class="menu-section">
                <ul class="list-group horiziontal share-items">
                    <li class="menu-item --socialShare">F</li>
                    <li class="menu-item --socialShare">T</li>
                    <li class="menu-item --socialShare">G</li>
                    <li class="menu-item --socialShare">M</li>
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
    @import "~css/_variables_and_mixins.scss";
</style>
