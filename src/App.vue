<template>
  <v-app :class="mainAppClasses">
    <div class="d-flex flex-column flex-grow-1">
      <SideNav v-if="isSidebarAvailable" v-model="drawer" />
      <div class="d-flex flex-column flex-grow-1">
        <Navbar
          :toggle="toggleDrawer"
          :isSidebarAvailable="isSidebarAvailable"
        />
        <v-content class="d-flex flex-column flex-grow-1">
          <router-view v-if="isAppReadyToLoad" />
          <Error />
          <Success />
          <Loading />
        </v-content>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import absAPI from "@/api/absAPI";
import Error from "@/components/notifications/Error";
import Success from "@/components/notifications/Success";
import Loading from "@/components/notifications/Loading";
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
    Footer,
    Error,
    Success,
    Loading
  },
  async created() {
    absAPI.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        console.log('error');
        console.log({error});
        console.log(error.response);
        console.log('====');
        if (
          error?.response?.status !== 401 ||
          error?.response?.data?.error !== "Not authorized" ||
          error?.response?.config?.url === "/authentication_renewals"

        ) {
          console.error('no user error: ', error.response);
          return Promise.reject(error.response);
        }

        console.error("user error 401: ", error);

        const authData = JSON.parse(localStorage.getItem("authData"));
        console.log("auth data: ", authData);
        return this.$store.dispatch(auth.retry, authData?.email).then(res => {
          console.log(res.access);
          if (authData?.token !== res.access) {
            console.log("setting refresh token");
            error.response.hasRefreshedToken = true;
          }
          return Promise.reject(error.response);
        });
      }
    );

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
      const viewport = this.$vuetify.breakpoint.mdAndUp
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
.v-application.user.medium-up:not(.home) {
  padding-left: 256px;
}
.v-content::v-deep .v-content__wrap {
  display: flex;
  flex-direction: column;
}
</style>
