<template>
    <div class="call-to-action" @click="startAction">
      <router-link to="/flight-simulator">
          Start a new<br>aerosolar journey
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    startAction() {
      this.$store.commit('general/closeMenu');
    },
  },
};
</script>
<style lang="scss">
    // homepage
    body.home {
        .call-to-action {
            background-color: #1E1E1E;
            display: block;
            color: #fff;
            position: fixed;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 280px;
            text-align: center;
            padding: 1em;
            transition: background-color .2s ease;
            a {
                text-decoration: none;
            }
            &:hover {
                background-color: #2E2E2E;
            }
        }
        .nav-brand {
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            top: 10%
        }
        .router-view {
            position: absolute;
            width:100%;
            height: 100%;
            background-color: transparent;
            z-index: 10;
        }
        .main-visualization {
            top: 400px;
        }
    }
</style>
