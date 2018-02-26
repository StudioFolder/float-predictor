<template>
    <div class="main-content over">
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
        transition: background-color .2s ease;
        &:hover {
            background-color: #2E2E2E;
        }
    }
}
</style>
