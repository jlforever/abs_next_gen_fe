<template>
  <AuthWrap>
    <template v-slot:title>Login To Your Account</template>
    <v-card-text>
      <v-form id="login" @submit.prevent="handleSubmit">
        <v-text-field
          label="Email"
          name="email"
          prepend-icon="mdi-account"
          type="text"
          color="secondary"
          v-model="user.email"
        />
        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          color="secondary"
          v-model="user.password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <CardButton
        type="submit"
        size="x-large"
        form="login"
        color="secondary"
        :disabled="!user.email && !user.password"
      >Login</CardButton>
    </v-card-actions>
    <v-card-text>
      <div>
        Not registered?
        <router-link to="/signup">Create an account</router-link>
        <span class="px-1">|</span>
        <router-link to="/forgot_password">Forgot password?</router-link>
      </div>
    </v-card-text>
  </AuthWrap>
</template>

<script>
import AuthWrap from "@/components/layouts/AuthWrap";
import CardButton from "@/components/buttons/CardButton";
import actionTypes from "@/store/actions";
const { auth } = actionTypes;
export default {
  name: "Login",
  metaInfo: {
    title: "Sign In To Your Account"
  },
  components: { AuthWrap, CardButton },
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
        url: "/authentications",
        data: {
          user: this.user
        }
      };
      this.$store.dispatch(auth.request, params).then(() => {
        this.$router.push("/parent");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form h1 {
  color: $brand-pink;
}
.form {
  text-align: left;
}
</style>
