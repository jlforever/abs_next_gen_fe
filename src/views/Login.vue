<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-card elevation="1" shaped>
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form id="login" @submit.prevent="handleSubmit">
            <v-text-field
              label="Email"
              name="email"
              prepend-icon="person"
              type="text"
              color="accent"
              v-model="user.email"
            />
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
              color="accent"
              v-model="user.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" form="login" color="accent">Login</v-btn>
        </v-card-actions>
        <v-card-text>
          <span>
            Not registered?
            <a href="/">Create an account</a>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
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
      console.log("this works");
      const res = axios.post(
        "http://localhost:9292/api/v1/authentication_access_tokens",
        { user: this.user }
      );
      console.log(res);
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
