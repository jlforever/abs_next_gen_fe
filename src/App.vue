<template>
  <v-app>
    <Navbar :toggle="toggleDrawer" />
    <v-content>
      <SideNav :drawer="drawer" />
      <v-container>
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

export default {
  name: "App",

  components: {
    Navbar,
    SideNav,
    Footer
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
