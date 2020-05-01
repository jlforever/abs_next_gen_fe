<template lang="html">
  <sui-menu color="green">
    <router-link is="sui-menu-item" to="/">Home</router-link>
    <router-link is="sui-menu-item" to="/about">About</router-link>
    <router-link is="sui-menu-item" to="/docs">Docs</router-link>
  </sui-menu>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
