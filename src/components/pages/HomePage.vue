<template>
    <div class="main-content over">
        <div class="call-to-action" @click="startAction">
          <router-link to="/flight-simulator" class="shadowed">
              Start a new<br>aerosolar journey
          </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      upperHeight: 0,
    };
  },
  mounted() {
    /**
     * check if mobile and toggle full screen
     */
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.scrollTo(0, 1);
    }
  },
  methods: {
    startAction() {
      this.$store.commit('general/closeMenu');
      this.$store.commit('general/setFormStatus', true);
    },
  },
};
</script>
<style lang="scss">

.call-to-action {
    margin: 60vh auto 0;
    color: #fff;
    width: auto;
    text-align: center;
    a {
        display: inline-block;
        background-color: #1E1E1E;
        padding: .7em 1.5em;
        text-decoration: none;
        transition: background-color .4s ease, color .4s ease;
        &:hover {
            background-color: #2E2E2E;
        }
    }
}
</style>
