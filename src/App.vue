<template>
  <v-app>
    <div class="fill-height">
      <SideNav v-if="isAuthenticated" v-model="drawer" />
      <div :class="`${$vuetify.breakpoint.mdOnly ? 'desktop' : 'mobile'}`">
        <Navbar :toggle="toggleDrawer" />
        <v-content>
          <v-container>
            <router-view />
          </v-container>
        </v-content>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import actionTypes from "@/store/actions";
import "vue-lazy-youtube-video/dist/style.css";
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
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>
<style lang="scss" scoped>
.desktop {
  padding-left: 256px;
}
</style>
