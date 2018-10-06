<template>
    <div id="app" class="main-application">
        <site-header />
        <transition appear name="fade" mode="out-in">
            <info-box v-if="isInfoBoxOpen"/>
        </transition>
        <transition appear name="fade" mode="out-in">
            <router-view/>
        </transition>
        <footer v-if="!isServer">
            <div class="font-small">
                Aerocene is an open artistic project by Studio Tomás Saraceno.
                Design and code by Studio Folder and Angelo Semeraro.
            </div>
        </footer>
        <StateRemoteSync/>
    </div>
</template>

<script>
/**
 * @author Studio Folder - @StudioFolder / http://studiofolder.it
 * @author Iacopo Leardini - @iacopolea
 * @author Angelo Semeraro - @angeloseme / http://angelosemeraro.info
*/
import siteHeader from 'Components/Header';
import infoBox from 'Parts/InfoBox';
import StateRemoteSync from 'Components/StateRemoteSync';

export default {
  name: 'App',
  components: { siteHeader, infoBox, StateRemoteSync },
  computed: {
    isInfoBoxOpen() {
      return this.$store.state.general.isInfoBoxOpen;
    },
    isServer() {
      return (this.$route.name === 'visualization-server');
    },
  },
};
</script>

<style lang="scss">
@import "assets/css/main";
html, body {
    height: 100%;
}
.main-application {
    display: flex;
    flex-flow: column;
    height: 100%;
}
.visualization-client {
    flex: 1 1 100%;
}
.home-content, .simulator-content {
    height: 100%;
}
footer {
    padding: 0 $marginMobile;
}
</style>
