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
                        <li class="menu-item --logo" @click="closeAction">
                            <img src="~img/globe_illustration.svg"></li>
                        <li class="menu-item --nav" @click="closeAction">
                            start a new<br>aerosolar journey</li>
                    </router-link>
                </ul>
            </div>
        </div>
        <div class="body">
            <div class="menu-section">
                <ul class="list-group menu-items" @click="closeAction">
                    <li class="menu-item --nav">
                        <router-link to="/about">
                            About</router-link></li>
                    <li class="menu-item --nav">
                        <router-link to="/gallery">
                            Aeroglyphs archive</router-link></li>
                    <li class="menu-item --nav">Aerocene explorer</li>
                    <li class="menu-item --nav">Resources and APIs</li>
                    <li class="menu-item --nav">
                        <a href="#" @click.prevent v-b-modal.instruction-modal>
                            Instructions</a>
                    </li>
                    <li class="menu-item --nav">
                        <router-link to="/impressum">
                            Impressum</router-link></li>
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
        <div class="footer modal-contents">
            <instructions>
            </instructions>
        </div>
    </div>
</template>

<script>
import instructions from './InstructionsModal';

export default {
  name: 'main-nav',
  components: { instructions },
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

        .modal-title {
            @extend .h2;
            @extend %colfax_med;
            margin: .4rem 0;
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
