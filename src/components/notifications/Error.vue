<template>
  <v-snackbar v-model="opened" color="error" :timeout="timeout" top>
    <span v-for="(msg, key) in errors" :key="key">
      {{ msg }}
    </span>
    <v-btn dark icon @click="opened = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "Error",
  data() {
    return {
      timeout: 200000
    };
  },
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
