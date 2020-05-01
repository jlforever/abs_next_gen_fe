<template lang="html">
  <v-app-bar color="primary" dark>
    <v-app-bar-nav-icon @click="toggle"></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/docs">Docs</router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    toggle: Function
  }
};
</script>
