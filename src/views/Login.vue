<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              label="Email"
              name="email"
              prepend-icon="person"
              type="text"
              v-model="user.email"
            />
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="lock"
              type="password"
              v-model="user.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn type="submit" color="primary">Login</v-btn>
        </v-card-actions>
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
      const res = axios.post(
        "http://77ada7f3.ngrok.io/api/v1/authentication_access_tokens",
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
