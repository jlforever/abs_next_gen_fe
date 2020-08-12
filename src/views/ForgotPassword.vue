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
      <p v-if="success">{{successMessage}}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <CardButton
        type="submit"
        size="x-large"
        form="forgot_password"
        color="secondary"
        :disabled="success"
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
import AuthService from "@/service/authService";
import AuthWrap from "@/components/layouts/AuthWrap";
import CardButton from "@/components/buttons/CardButton";
import actionTypes from "@/store/actions";
const { errors, success } = actionTypes;
export default {
  name: "ForgotPassword",
  components: { AuthWrap, CardButton },
  data() {
    return {
      email: "",
      success: false,
      successMessage: "Email with password reset instructions had been sent."
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await AuthService.passwordResetRequest({
          reset_request: { user_email: this.email }
        });
        this.$store.dispatch(success.snack, this.successMessage);
        this.email = "";
        this.success = true;
      } catch (err) {
        this.$store.dispatch(errors.format, err);
      }
    }
  }
};
</script>