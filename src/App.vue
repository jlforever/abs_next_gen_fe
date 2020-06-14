<template>
  <v-app :class="mainAppClasses">
    <div class="fill-height">
      <SideNav v-if="isSidebarAvailable" v-model="drawer" />
      <div>
        <Navbar :toggle="toggleDrawer" />
        <v-content>
          <v-container>
            <router-view v-if="isAppReadyToLoad" />
          </v-container>
        </v-content>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import Footer from "@/components/Footer";
import actionTypes from "@/store/actions";
import "vue-lazy-youtube-video/dist/style.css";
const { users, auth } = actionTypes;

export default {
  name: "App",
  metaInfo: {
    title: "Foreign Language Classes For Young Children",
    titleTemplate: "%s | Alpha Beta Academy",
    meta: [
      {
        name: "description",
        content:
          "Professional foreign language teachers who are passionate about teaching foreign language to young children.",
        vmid: "description"
      }
    ],
    script: [
      {
        innerHTML: '{ "@context": "http://www.schema.org", "@type": "School" }',
        type: "application/ld+json"
      }
    ]
  },
  components: {
    Navbar,
    SideNav,
    Footer
  },
  async created() {
    if (this.isAuthenticated) {
      await this.$store.dispatch(auth.success);
      await this.$store.dispatch(users.request);
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
    ...mapGetters(["isAuthenticated", "authStatus", "activeUser"]),
    mainAppClasses() {
      const viewport = this.$vuetify.breakpoint.mdOnly
        ? "medium-up"
        : "small-down";
      const isUser = this.isAuthenticated ? "user" : "visitor";
      const route = this.$route?.name?.toLowerCase();

      return `${route} ${isUser} ${viewport}`;
    },
    isSidebarAvailable() {
      return this.isAuthenticated && this.$route.name !== "Home";
    },
    isAppReadyToLoad() {
      if (this.isAuthenticated) {
        if (this.authStatus && this.activeUser?.email) return true;
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.user.medium-up:not(.home) {
  padding-left: 256px;
}
</style>
