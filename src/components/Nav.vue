<template>
    <nav :class="[{'active':isActive}, 'navbar']">
        <div @click="toggleMenu" :class="[{'active':isActive}, 'hamburger-menu']">
        </div>
        <router-link to="/">
            <span @click="toggleMenu" class="home-link-mobile">Home</span>
        </router-link>
        <router-link to="/about">
            <span @click="toggleMenu">About</span>
        </router-link>
        <router-link to="/contatti">
            <span @click="toggleMenu">Contacts</span>
        </router-link>
    </nav>
</template>
<script>
export default {
  name: 'nav',
  data() {
    return {
      isActive: false,
      isLoading: false,
    };
  },
  methods: {
    toggleMenu() {
      console.log('toggleMenu');
    },
  },
};
</script>
