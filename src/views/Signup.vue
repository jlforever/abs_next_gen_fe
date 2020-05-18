<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-card elevation="1" shaped>
        <v-toolbar color="accent" dark flat>
          <v-toolbar-title>Create An Account</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="signup" @submit.prevent="handleSubmit">
            <v-text-field
              label="Email"
              name="email"
              prepend-icon="mdi-account"
              type="text"
              color="accent"
              v-model="user.email"
            />
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              color="accent"
              v-model="user.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" form="signup" color="accent">Signup</v-btn>
        </v-card-actions>
        <v-card-text>
          <span>
            Already registered?
            <router-link to="/login">Log in</router-link>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import actionTypes from "@/store/actions";
const { auth } = actionTypes;
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async handleSubmit() {
      const params = {
        url: "/sign_ups",
        data: {
          user: this.user
        }
      };
      this.$store.dispatch(auth.request, params).then(() => {
        this.$router.push("/profile");
      });
    }
  }
};
</script>

<style lang="scss">
.form h1 {
  color: $brand-pink;
}
.form {
  text-align: left;
}
</style>
