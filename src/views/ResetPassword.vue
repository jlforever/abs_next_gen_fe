<template>
  <AuthWrap>
    <template v-slot:title>Reset Password</template>
    <v-card-text>
      <v-form id="reset_password" @submit.prevent="handleReset">
        <v-text-field
          id="password"
          label="New Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          color="secondary"
          v-model="password"
        />
        <v-text-field
          id="password_confirmation"
          label="Password Confirmation"
          name="password_confirmation"
          prepend-icon="mdi-lock"
          type="password"
          color="secondary"
          v-model="password_confirmation"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <CardButton
        type="submit"
        size="x-large"
        form="reset_password"
        color="secondary"
      >Reset password</CardButton>
    </v-card-actions>
    <v-card-text>
      <div>
        <router-link to="/">Log in</router-link>
      </div>
    </v-card-text>
  </AuthWrap>
</template>

<script>
import AuthWrap from "@/components/layouts/AuthWrap";
import CardButton from "@/components/buttons/CardButton";
export default {
  name: "ResetPassword",
  components: { AuthWrap, CardButton },
  data() {
    return {
      password: "",
      password_confirmation: "",
      error: "",
      notice: ""
    };
  },
  created() {
    this.checkPasswordToken();
  },
  methods: {
    handleReset() {
      this.$http.plain
        .patch(`/password_resets/${this.$route.params.token}`, {
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => this.resetSuccessful(response))
        .catch(error => this.resetFailed(error));
    },
    resetSuccessful(response) {
      this.notice =
        "Your password has been reset successfully! Please sign in with your new password.";
      this.error = "";
      this.password = "";
      this.password_confirmation = "";
    },
    resetFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "Something went wrong";
      this.notice = "";
    },
    checkPasswordToken() {
      this.$http.plain
        .get(`/password_resets/${this.$route.params.token}`)
        .catch(error => {
          this.resetFailed(error);
          this.$router.replace("/");
        });
    }
  }
};
</script>