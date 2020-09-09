<template>
  <AuthWrap>
    <template v-slot:title>Create An Account</template>
    <v-card-text>
      <v-form id="signup" @submit.prevent="handleSubmit">
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
      <CardButton type="submit" size="x-large" form="signup" color="secondary">
        Join
      </CardButton>
    </v-card-actions>
    <v-card-text>
      <span>
        Already registered?
        <router-link to="/login">Log in</router-link>
      </span>
    </v-card-text>
  </AuthWrap>
</template>

<script>
import AuthWrap from "@/components/layouts/AuthWrap";
import CardButton from "@/components/buttons/CardButton";
import actionTypes from "@/store/actions";
const { auth } = actionTypes;
export default {
  name: "Signup",
  metaInfo: {
    title: "Get Started Today"
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
        url: "/sign_ups",
        data: {
          user: this.user
        }
      };
      this.$store.dispatch(auth.request, params).then(() => {
        this.$router.push("/user");
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
