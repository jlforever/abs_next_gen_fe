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
import AuthService from "@/service/authService";
import AuthWrap from "@/components/layouts/AuthWrap";
import CardButton from "@/components/buttons/CardButton";
import actionTypes from "@/store/actions";
const { errors, success } = actionTypes;
export default {
  name: "ResetPassword",
  components: { AuthWrap, CardButton },
  data() {
    return {
      password: "",
      password_confirmation: "",
      successMessage:
        "Your password has been reset successfully! Please sign in with your new password."
    };
  },
  created() {
    this.checkPasswordToken();
  },
  methods: {
    async handleReset() {
      const params = {
        password_reset: {
          password: this.password,
          password_confirmation: this.password_confirmation
        }
      };
      try {
        await AuthService.passwordResetSubmit(this.$route.params.token, params);
        this.$store.dispatch(success.snack, this.successMessage);
        this.password = "";
        this.password_confirmation = "";
        this.$router.replace("/login");
      } catch (err) {
        this.$store.dispatch(errors.format, err);
      }
    },
    async checkPasswordToken() {
      try {
        await AuthService.passwordResetVerify(this.$route.params.token);
      } catch (err) {
        this.$store.dispatch(errors.format, err);
        this.$router.replace("/");
      }
    }
  }
};
</script>