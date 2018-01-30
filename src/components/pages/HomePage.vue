<template>
    <div class="call-to-action">
      <router-link to="/flight-simulator">Start a new<br>aerosolar journey</router-link>
    </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>
<style lang="scss">
    .call-to-action {
    display: block;
    color: #fff;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 280px;
    text-align: center;
    padding: 1em;
        a {
          text-decoration: none;
        }
    }
</style>
