<template>
  <AuthWrap>
    <template v-slot:title>Forgotten Password</template>
    <v-card-text>
      <v-form id="forgot_password" @submit.prevent="handleSubmit">
        <v-text-field
          label="Email"
          name="email"
          prepend-icon="mdi-account"
          type="text"
          color="secondary"
          v-model="email"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <CardButton
        type="submit"
        size="x-large"
        form="forgot_password"
        color="secondary"
      >Reset Password</CardButton>
    </v-card-actions>
    <v-card-text>
      <div>
        <router-link to="/login">Log in</router-link>
        <span class="px-1">|</span>
        Not registered?
        <router-link to="/signup">Create an account</router-link>
      </div>
    </v-card-text>
  </AuthWrap>
</template>

<script>
import AuthWrap from "@/components/layouts/AuthWrap";
import CardButton from "@/components/buttons/CardButton";
export default {
  name: "ForgotPassword",
  components: { AuthWrap, CardButton },
  data() {
    return {
      email: "",
      error: "",
      notice: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$http.plain
        .post("/password_resets", { email: this.email })
        .then(() => this.submitSuccessful())
        .catch(error => this.submitFailed(error));
    },
    submitSuccessful() {
      this.notice = "Email with password reset instructions had been sent.";
      this.error = "";
      this.email = "";
    },
    submitFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "";
    }
  }
};
</script>