<template lang="html">
  <v-app-bar class="shrink" center light flat>
    <v-app-bar-nav-icon
      color="accent"
      @click.stop="toggle"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <v-avatar :tile="true">
      <img src="../assets/abs_logo_abstractmark.png" alt="logo" />
    </v-avatar>
    <v-toolbar-title>Alpha Beta Academy</v-toolbar-title>
    <v-spacer />
    <div class="social-buttons">
      <v-btn href="http://youtube.com" color="accent" target="_blank" icon>
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-btn href="http://facebook.com" color="accent" target="_blank" icon>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn href="http://twitter.com" color="accent" target="_blank" icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn v-if="!isAuthenticated" to="/login" text>Login</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    toggle: Function
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss">
.v-app-bar__nav-icon,
.social-buttons {
  position: absolute;
}
.v-app-bar__nav-icon {
  position: absolute;
  left: 16px;
}
.social-buttons {
  right: 16px;
}
</style>
