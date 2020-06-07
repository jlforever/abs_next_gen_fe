<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8">
      <v-card elevation="1">
        <v-toolbar color="secondary" dark flat>
          <v-toolbar-title>Login To Your Account</v-toolbar-title>
        </v-toolbar>
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
          >
            Login
          </CardButton>
        </v-card-actions>
        <v-card-text>
          <span>
            Not registered?
            <router-link to="/signup">Create an account</router-link>
          </span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import CardButton from "@/components/buttons/CardButton";
import actionTypes from "@/store/actions";
const { auth } = actionTypes;
export default {
  name: "Login",
  metaInfo: {
    title: "Sign In To Your Account"
  },
  components: { CardButton },
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
        this.$router.push("/profile");
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
