<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" absolute temporary>
    <v-list-item two-line>
      <!-- For when avatars are added
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/men/90.jpg" />
      </v-list-item-avatar>
      -->

      <v-list-item-content v-if="isAuthenticated && profile">
        <v-list-item-title>{{buildDisplay}}</v-list-item-title>
        <v-list-item-subtitle>{{ getRole }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-spacer />
      <v-list-item v-if="!isAuthenticated" link to="/login">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!isAuthenticated" link to="/signup">
        <v-list-item-icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Signup</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isAuthenticated" link to="/profile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isParent" link to="/family">
        <v-list-item-icon>
          <v-icon>mdi-human-male-female</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Family Members</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="isAuthenticated" @click="logoutUser">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import actionTypes from "@/store/actions";
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    profile() {
      return this.$store.getters.activeUser;
    },
    isParent() {
      if (this.profile?.parent) {
        return Object.keys(this.profile.parent).length;
      }
      return false;
    },
    isTeacher() {
      if (this.profile?.teacher) {
        return Object.keys(this.profile.teacher).length;
      }
      return false;
    },
    getRole() {
      if (this.isTeacher && this.isParent) {
        return "Teacher/Parent";
      } else if (this.isParent) {
        return "Parent";
      } else if (this.isTeacher) {
        return "Teacher";
      }
      return "";
    },
    buildDisplay() {
      if (this.profile?.first_name && this.profile?.last_name) {
        return `${this.profile.first_name} ${this.profile.last_name}`;
      }
      return this.profile?.email;
    }
  }
};
</script>
