<template lang="html">
  <v-app-bar class="shrink" center light flat>
    <v-app-bar-nav-icon
      color="secondary"
      @click.stop="toggle"
      v-if="$vuetify.breakpoint.smAndDown && isAuthenticated"
    ></v-app-bar-nav-icon>
    <v-spacer />
    <v-avatar :tile="true">
      <img src="../assets/abs_logo_abstractmark.png" alt="logo" />
    </v-avatar>
    <v-toolbar-title><router-link class="text--primary" to="/">Alpha Beta Academy</router-link></v-toolbar-title>
    <v-spacer />
    <div class="user-buttons right-buttons" v-if="isDashboardButtonAvailable">
      <v-btn to="/dashboard" text>Dashboard</v-btn>
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
    toggle: Function
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
.v-toolbar__title a {
  text-decoration: none;
}
.v-toolbar__content .v-app-bar__nav-icon.v-btn,
.right-buttons {
  position: absolute;
}
.v-toolbar__content .v-app-bar__nav-icon.v-btn {
  left: 16px;
  margin-left: 0;
}
.right-buttons {
  right: 16px;
  .v-btn {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
