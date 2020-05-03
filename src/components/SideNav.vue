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
        <v-list-item-title>Application</v-list-item-title>
        <v-list-item-subtitle>Subtext</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>person</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Account</v-list-item-title>
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
