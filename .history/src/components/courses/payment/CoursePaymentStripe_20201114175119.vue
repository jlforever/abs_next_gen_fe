<template>
  <div>
    <stripe-elements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
    <button @click="submit">Pay ${{ amount / 100 }}</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    amount: 1000,
    publishableKey: process.env.VUE_APP_STRIPE_API_KEY, 
    token: null,
    //charge: null
  }),
  methods: {
    submit () {
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.card,
        amount: this.amount,
        description: this.description
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
      // Send to server
    }
  }
}
</script>