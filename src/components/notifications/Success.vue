<template>
  <v-snackbar v-model="showBar" color="success" :timeout="timeout" top>
    {{ message }}
    <v-btn dark icon @click.native="closeSnack">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import actionTypes from "@/store/actions";
const { success } = actionTypes;

export default {
  name: "Success",
  data() {
    return {
      timeout: 3000,
      showBar: false,
      message: null
    };
  },
  created: function() {
    this.$store.watch(
      state => state.success.snackMessage,
      () => {
        const msg = this.$store.state.success.snackMessage;
        if (msg) {
          this.showBar = true;
          this.message = msg;
          setTimeout(() => {
            this.showBar = false;
            this.$store.dispatch(success.snack, null);
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
