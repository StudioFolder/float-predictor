<template>
    <div class="main-content" :style="{ height: upperHeight }">
        <article role="article" class="article" ref="content">
            <h1 class="entry-title">About</h1>
            <h2 class="entry-subtitle">
                Aerocene holds a message of simplicity,
                creativity and cooperation for a world of tumultuous geopolitical relations,
                reminding us of our symbiotic relationship with the Earth and all its species.
            </h2>
            <div class="entry-body">
                <p>
                    The Aerocene Explorer is your personal tool for solar-powered atmospheric
                    exploration: a tethered-flight starter kit offering
                    a new way to sense the environment.
                    Enclosed in a portable backpack is everything you need to
                    float an Explorer sculpture and start exploring the skies.
                </p>
                <p>
                    Designed to engage participants in thinking-through-making activity,
                    stimulate imagination and creativity,
                    and impart information about solar balloon flight,
                    thermodynamic physics, meteorological science,
                    and art practices in a multidisciplinary way,
                    the Explorer allows participants to draw signatures in,
                    of and with the air, declaring independence from fossil fuels.
                </p>
            </div>
            <back-to-viz />
        </article>
    </div>
</template>

<script>
import backToViz from 'Parts/BackToViz';

export default {
  name: 'About',
  components: {
    backToViz,
  },
  data() {
    return {
      upperHeight: 0,
    };
  },
  created() {
    this.$store.commit('flightSimulator/setVisualizationState', 6);
  },
  mounted() {
    this.upperHeight = `${this.$refs.content.clientHeight}px`;
  },
};
</script>
