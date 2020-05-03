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

export default {
  name: "App",

  components: {
    Navbar,
    SideNav,
    Footer
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
