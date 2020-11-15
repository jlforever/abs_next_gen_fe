<template>
  <v-card class="payment-card" color="grey lighten-3">
      <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Payment
        </v-list-item-title>
        <v-list-item-subtitle>
<stripe-elements
      ref="elementsRef"
      :pk="publishableKey"
      :amount="amount"
      @token="tokenCreated"
      @loading="loading = $event"
    >
    </stripe-elements>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined
        rounded
        text @click="submit">Pay ${{amount / 100}}</v-btn>
    </v-card-actions>
    
    
  </v-card>
</template>

<script>
import { StripeElements } from 'vue-stripe-checkout';
export default {
  components: {
    StripeElements
  },
  data: () => ({
    loading: false,
    amount: 1000,
    publishableKey: process.env.VUE_APP_STRIPE_API_KEY, 
    token: null,
    charge: null
  }),
  methods: {
    submit () {
      this.$refs.elementsRef.submit();
    },
    tokenCreated (token) {
      this.token = token;
      // for additional charge objects go to https://stripe.com/docs/api/charges/object
      this.charge = {
        source: token.id,
        amount: this.amount, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
        description: this.description // optional description that will show up on stripe when looking at payments
      }
      this.sendTokenToServer(this.charge);
    },
    sendTokenToServer (charge) {
      // Send to charge to your backend server to be processed
      // Documentation here: https://stripe.com/docs/api/charges/create
      console.log(charge)
  
    }
  }
}
</script>