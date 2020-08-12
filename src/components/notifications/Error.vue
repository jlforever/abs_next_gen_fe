<template>
  <v-snackbar v-model="showBar" color="error" :timeout="timeout" top>
    {{ message }}
    <v-btn dark icon @click.native="closeSnack">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import actionTypes from "@/store/actions";
const { errors } = actionTypes;

export default {
  name: "Error",
  data() {
    return {
      timeout: 3000,
      showBar: false,
      message: null
    };
  },
  created: function() {
    this.$store.watch(
      state => state.errors.snackMessage,
      () => {
        const msg = this.$store.state.errors.snackMessage;
        if (msg) {
          this.showBar = true;
          this.message = msg;
          setTimeout(() => {
            this.showBar = false;
            this.$store.dispatch(errors.snack, null);
          }, this.timeout);
        }
      }
    );
  },
  methods: {
    closeSnack() {
      this.showBar = false;
    }
  }
};
</script>
