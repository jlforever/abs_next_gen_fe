<template lang="html">
  <v-app-bar class="shrink" color="secondary" dark>
    <v-app-bar-nav-icon @click.stop="toggle"></v-app-bar-nav-icon>
    <v-avatar :tile="true">
      <img src="../assets/abs_logo_abstractmark.png" alt="logo" />
    </v-avatar>
    <v-toolbar-title>Alpha Beta Academy</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/login" text>Login</v-btn>
      <v-btn to="/docs" text>Docs</v-btn>
    </v-toolbar-items>
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
