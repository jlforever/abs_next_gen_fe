<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    fixed
    height="100vh"
    floating
  >
    <v-list-item two-line>
      <v-list-item-avatar color="primary">
        <v-icon dark>mdi-account</v-icon>
        <!-- <img src="https://randomuser.me/api/portraits/men/90.jpg" /> -->
      </v-list-item-avatar>

      <v-list-item-content v-if="isAuthenticated && activeUser">
        <v-list-item-title>{{ buildDisplay }}</v-list-item-title>
        <v-list-item-subtitle>{{ getRole }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav dense>
      <!--TODO:<v-list-item link to="/dashboard" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>-->
      <v-list-item link to="/user" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>User Info</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isUserParent" link to="/students" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-human-male-female</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Students</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isUserParent" link to="/courses" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-school</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Courses</v-list-item-title>
      </v-list-item>
      <v-list-item
        v-if="isUserTeacher"
        link
        to="/courses/manage"
        color="primary"
      >
        <v-list-item-icon>
          <v-icon>mdi-tooltip-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Course Management</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logoutUser" block small outlined color="primary">
          <v-icon>mdi-logout</v-icon>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import actionTypes from "@/store/actions";
import { mapGetters } from "vuex";
const { auth } = actionTypes;
export default {
  name: "Sidenav",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch(auth.logout).then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    ...mapGetters(["activeUser", "isUserParent", "isUserTeacher"]),
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    getRole() {
      if (this.isUserTeacher && this.isUserParent) {
        return "Teacher/Parent";
      } else if (this.isUserParent) {
        return "Parent";
      } else if (this.isUserTeacher) {
        return "Teacher";
      }
      return "";
    },
    buildDisplay() {
      if (this.activeUser?.first_name && this.activeUser?.last_name) {
        return `${this.activeUser.first_name} ${this.activeUser.last_name}`;
      }
      return this.activeUser?.email;
    }
  }
};
</script>
