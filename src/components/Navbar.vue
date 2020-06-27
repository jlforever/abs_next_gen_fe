<template lang="html">
  <v-app-bar class="shrink" center light flat :height="100">
    <v-app-bar-nav-icon
      color="secondary"
      @click.stop="toggle"
      v-if="$vuetify.breakpoint.smAndDown && isSidebarAvailable"
    ></v-app-bar-nav-icon>
    <v-avatar :tile="true" :height="75" :width="75">
      <img src="../assets/abs_logo_abstractmark.png" alt="logo" />
    </v-avatar>
    <v-toolbar-title>
      <router-link class="text--primary" to="/">Alpha Beta Academy</router-link>
    </v-toolbar-title>
    <v-spacer />
    <div class="user-buttons right-buttons" v-if="isDashboardButtonAvailable">
      <v-btn to="/parent" text>Dashboard</v-btn>
    </div>
    <div class="visitor-buttons right-buttons" v-if="!isAuthenticated">
      <v-btn to="/login" text>Login</v-btn>
      <v-btn to="/signup" color="secondary" depressed>Get Started</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    toggle: Function,
    isSidebarAvailable: Boolean
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isDashboardButtonAvailable() {
      return this.isAuthenticated && this.$route.name === "Home";
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  font-size: 1.5rem;
  a {
    text-decoration: none;
  }
}
.v-toolbar__content .v-app-bar__nav-icon.v-btn {
  margin-left: 0;
}
.right-buttons {
  .v-btn {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
