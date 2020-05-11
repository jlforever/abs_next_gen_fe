<template>
  <v-navigation-drawer
    :value="value"
    v-on:input="$emit('input', $event)"
    absolute
    temporary
  >
    <v-list-item two-line>
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/men/90.jpg" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Name</v-list-item-title>
        <v-list-item-subtitle>Role</v-list-item-subtitle>
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
      <v-list-item link to="/login">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Login</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/signup">
        <v-list-item-icon>
          <v-icon>mdi-account-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Signup</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidenav",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>
