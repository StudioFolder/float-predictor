<template>
    <div class="main-content" :style="{height: upperHeight}">
        <div class="call-to-action" @click="startAction">
          <router-link to="/flight-simulator">
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
  methods: {
    startAction() {
      this.$store.commit('general/closeMenu');
    },
  },
  mounted() {
    this.upperHeight = '450px';
  },
  /*
  created() {
    this.$store.commit('general/setUpperHeight', 'inherit');
    this.$store.commit('general/setBottomHeight', 0);
  },
  */
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
            top: 100%;
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
    }
</style>
