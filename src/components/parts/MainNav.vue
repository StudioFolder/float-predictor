<template>
    <div class="main-nav">
        <div class="header">
            <b-nav vertical>
                <b-nav-item @click="closeAction" class="--close --correction">
                    <i class="fp fp-close-w"></i></b-nav-item>
            </b-nav>
            <div class="menu-section">
                <ul class="list-group menu-items">
                    <router-link to="/flight-simulator">
                        <li class="menu-item --logo">
                            <img src="~img/globe_gif.gif" @click="startNew"></li>
                        <li class="menu-item --nav">
                            <div @click="startNew">start a new<br>aerosolar journey</div></li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="body">
            <div class="macro-section --main">
                <div class="menu-section">
                    <ul class="list-group menu-items">
                        <li class="menu-item --nav" @click="closeAction">
                            <router-link to="/about">
                                About</router-link></li>
                        <li class="menu-item --nav" @click="closeAction">
                            <router-link to="/gallery">
                                Aeroglyphs archive</router-link></li>
                        <li class="menu-item --nav" @click="closeAction">
                            <router-link to="/aerocene-explorer">
                                Aerocene explorer</router-link></li>
                        <li class="menu-item --nav" @click="closeAction">
                                Resources and APIs</li>
                        <li class="menu-item --nav" @click="closeAction">
                            <a href="#" @click.prevent v-b-modal.instruction-modal>
                                Instructions</a></li>
                        <li class="menu-item --nav" >
                                Impressum</li>
                        <li class="menu-item --nav">Disclaimer</li>
                    </ul>
                </div>
                <div class="menu-section">
                    <ul class="list-group link-items">
                        <li class="menu-item --link">aerocene.org</li>
                        <li class="menu-item --link">forum</li>
                    </ul>
                </div>
            </div>
            <div class="macro-section --bottom">
                <div class="menu-section">
                    <ul class="list-group horiziontal share-items">
                        <li class="menu-item --socialShare"><i class="fp fp-facebook"></i></li>
                        <li class="menu-item --socialShare"><i class="fp fp-twitter"></i></li>
                        <li class="menu-item --socialShare"><i class="fp fp-mail"></i></li>
                        <li class="menu-item --socialShare"><i class="fp fp-google"></i></li>
                    </ul>
                </div>
                <div class="menu-section --rights">
                    <small>&copy; All rights reserved.<br>
                        Studio Tomás Saraceno {{currentYear}}</small>
                </div>
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
    startNew() {
      this.$store.commit('flightSimulator/setActive', false);
      this.$store.commit('flightSimulator/setActive', true);
      this.$store.commit('flightSimulator/setElapsedDays', 0);
      // this.$store.commit('flightSimulator/setPlaying', false);
      this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('general/setFormStatus', true);
      this.$store.commit('general/toggleMenu');
    },
  },
};
</script>

<style lang="scss">
    @import "~css/_variables_and_mixins.scss";
    @import "~css/_typography.scss";
    .modal-content {
        border-radius: 0;
    }
    .modal-backdrop.show {
        opacity: .8;
    }
    .modal-header {
        color: #000;
        display: flex;
        align-items: center;
        padding-top: 2rem;
        padding-bottom: 2rem;

        .modal-title {
            @extend .h2;
            @extend %colfax_med;
            margin: .4rem 0 .4rem $marginItem*2.5;
        }
    }
    .modal-body {
        background-color: $lightBlack;
    }
    .modal-footer {
        background-color: $lightBlack;
        border-top: none;
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
</style>
