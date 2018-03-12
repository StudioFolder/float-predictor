<template>
    <div class="main-nav shadowed">
        <div class="header">
            <b-nav vertical>
                <b-nav-item @click="closeAction" class="--close --correction">
                    <i class="fp fp-close-w"></i></b-nav-item>
            </b-nav>
            <ul class="list-group menu-items brand-items">
                <router-link to="/flight-simulator">
                    <li class="menu-item --logo">
                        <img src="~img/globe_gif.gif" @click="startNew"></li>
                    <li class="menu-item --nav">
                        <div @click="startNew">start a new<br>aerosolar journey</div></li>
                </router-link>
            </ul>
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
                            <a href="#" @click.prevent>
                                Resources and API<span class="lowercase">s</span></a></li>
                        <li class="menu-item --nav" @click="closeAction">
                            <a href="#" @click.prevent v-b-modal.instruction-modal>
                                Instructions</a></li>
                        <li class="menu-item --nav" >
                            <a href="#" @click.prevent>
                                Impressum</a></li>
                        <li class="menu-item --nav">
                            <a href="#" @click.prevent>Disclaimer</a></li>
                    </ul>
                </div>
                <div class="menu-section">
                    <ul class="list-group link-items">
                        <li class="menu-item --link">
                            <a href="http://aerocene.org/">
                                <span class="lowercase">Aerocene Project</span>
                            </a>
                        </li>
                        <li class="menu-item --link">
                            <a href="https://forum.aerocene.org/">
                                <span class="lowercase">Aerocene Forum</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="macro-section --bottom">
                <div class="menu-section">
                    <ul class="list-group horiziontal share-items">
                        <vue-social-sharing></vue-social-sharing>
                        <li class="menu-item --socialShare"><i class="fp fp-facebook"></i></li>
                        <li class="menu-item --socialShare"><i class="fp fp-twitter"></i></li>
                        <li class="menu-item --socialShare"><i class="fp fp-mail"></i></li>
                        <li class="menu-item --socialShare"><i class="fp fp-google"></i></li>
                    </ul>
                </div>
                <div class="menu-section --rights">
                    <div class="font-small">
                        Aerocene is an open artistic project by <a href="http://tomassaraceno.com/">Studio Tomás Saraceno</a>.
                        Design and code by <a href="http://www.studiofolder.it/">Studio Folder</a> and Angelo Semeraro
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import socialSharing from 'vue-social-sharing';

export default {
  name: 'main-nav',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  components: { socialSharing },
  methods: {
    closeAction() { this.$store.commit('general/toggleMenu'); },
    startNew() {
      this.$store.dispatch('flightSimulator/resetVisualization');
      this.$store.commit('general/toggleMenu');
      this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('general/setFormStatus', true);
    },
  },
};
</script>
