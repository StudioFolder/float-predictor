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
                        <router-link to="/aerocene-explorer">
                            Aerocene Sculptures</router-link></li>
                    <li class="menu-item --nav" @click="closeAction">
                        <router-link to="/aeroglyphs-archive">
                            Aeroglyphs archive</router-link></li>
                    <li class="menu-item --nav" @click="closeAction">
                        <a href="#" @click.prevent v-b-modal.instruction-modal>
                            How to Float</a></li>
                    <li class="menu-item --nav" @click="closeAction">
                        <router-link to="/resources-and-api">
                            Resources and API</router-link></li>
                    <li class="menu-item --nav" >
                        <a href="#" @click.prevent v-b-modal.impressum-modal>
                            Impressum</a></li>
                    <li class="menu-item --nav">
                        <a href="#" @click.prevent v-b-modal.disclaimer-modal>
                            Disclaimer</a></li>
                </ul>
            </div>
            <div class="menu-section">
                <ul class="list-group link-items">
                    <li class="menu-item --link">
                         <a target="_blank" href="http://aerocene.org/">
                            <span class="lowercase">Aerocene Project</span>
                        </a>
                    </li>
                    <li class="menu-item --link">
                         <a target="_blank" href="https://forum.aerocene.org/">
                            <span class="lowercase">Aerocene Forum</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="menu-section">
                <ul class="list-group horiziontal share-items">
                    <li class="menu-item --socialShare">
                        <a href="https://www.facebook.com/aerocene/" target="_blank">
                            <i class="fp fp-facebook"></i></a>
                    </li>
                    <li class="menu-item --socialShare">
                        <a href="https://twitter.com/aerocene" target="_blank"><i class="fp fp-twitter"></i></a>
                    </li>
                    <li class="menu-item --socialShare">
                        <a href="https://www.instagram.com/aerocene/" target="_blank">
                            <i class="fp fp-instagram"></i></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="macro-section --bottom">
            <div class="menu-section --rights">
                <div class="font-small">
                    Aerocene is an open artistic project by  <a target="_blank" href="http://tomassaraceno.com/">Studio Tomás Saraceno</a>.
                    Trajectory computation by
                    <a href="https://eapsweb.mit.edu/" target="_blank">MIT EAPS</a>.
                    Design and code by  <a target="_blank" href="http://www.studiofolder.it/">Studio Folder</a> and Angelo Semeraro.
                </div>
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
      this.$store.dispatch('flightSimulator/resetVisualization');
      this.$store.commit('general/toggleMenu');
      this.$store.commit('flightSimulator/setVisualizationState', 8);
      this.$store.commit('general/setFormStatus', true);
    },
  },
};
</script>
