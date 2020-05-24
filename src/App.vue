<template>
  <v-app>
    <Navbar :toggle="toggleDrawer" />
    <v-content>
      <SideNav v-model="drawer" />
      <v-container class="fill-height">
        <router-view />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import actionTypes from "@/store/actions";
const { users } = actionTypes;

export default {
  name: "App",
  components: {
    Navbar,
    SideNav,
    Footer
  },
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(users.request);
    }
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
