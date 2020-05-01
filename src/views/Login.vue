<template>
  <sui-container class="form">
    <h1>This is an about page</h1>
    <sui-form @submit.prevent="handleSubmit">
      <sui-form-field>
        <label>Email</label>
        <input type="email" v-model="user.email" />
      </sui-form-field>
      <sui-form-field>
        <label>Password</label>
        <input type="password" v-model="user.password" />
      </sui-form-field>

      <sui-button type="submit">Submit</sui-button>
    </sui-form>
  </sui-container>
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
