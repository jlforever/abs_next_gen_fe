<template>
  <stripe-checkout
    ref="checkoutRef"
    :pk="publishableKey"
    :items="items"
    :successUrl="successUrl"
    :cancelUrl="cancelUrl"
  >
    <template slot="checkout-button">
      <button @click="checkout">Shut up and take my money!</button>
    </template>
  </stripe-checkout>
</template>

<script>
import { StripeCheckout } from 'vue-stripe-checkout';
export default {
  name: "CoursePaymentStripe",  
  components: {
    StripeCheckout
  },
  data: () => ({
    loading: false,
    publishableKey: process.env.VUE_APP_STRIPE_API_KEY, 
    items: [
      {
        sku: 'sku_FdQKocNoVzznpJ', 
        quantity: 1
      }
    ],
    successUrl: 'your-success-url',
    cancelUrl: 'your-cancel-url',
  }),
  mounted() {
      console.log(this.publishableKey)
  },
  methods: {
    checkout () {
      this.$refs.checkoutRef.redirectToCheckout();
    }
  }
}
</script>