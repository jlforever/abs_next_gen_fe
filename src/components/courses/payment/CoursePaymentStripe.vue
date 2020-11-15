<template>
    <v-card class="payment-card my-3" outlined color="grey lighten-3">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="d-flex mb-3">
                    <div>Payment</div>
                    <v-spacer />
                    <div v-if="currentPayment > 0">
                        ${{ currentPayment / 100 }}
                    </div>
                </v-list-item-title>
                <v-list-item-text>
                    <stripe-elements
                        v-if="currentPayment > 0"
                        ref="elementsRef"
                        :pk="publishableKey"
                        :amount="currentPayment"
                        @token="tokenCreated"
                        @loading="loading = $event"
                    >
                    </stripe-elements>
                    <p v-if="currentPayment <= 0" class="text--disabled">
                        Students must be selected before setting up payment
                        information.
                    </p>
                </v-list-item-text>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions v-if="fsdfsd">
            <v-btn outlined rounded text @click="submit"
                >Pay ${{ currentPayment / 100 }}</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script>
import { StripeElements } from 'vue-stripe-checkout'
export default {
    components: {
        StripeElements,
    },
    data: () => ({
        loading: false,
        publishableKey: process.env.VUE_APP_STRIPE_API_KEY,
        token: null,
        charge: null,
    }),
    props: {
        currentPayment: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        submit() {
            this.$refs.elementsRef.submit()
        },
        tokenCreated(token) {
            this.token = token
            // for additional charge objects go to https://stripe.com/docs/api/charges/object
            this.charge = {
                source: token.id,
                amount: this.$props.currentPayment, // the amount you want to charge the customer in cents. $100 is 1000 (it is strongly recommended you use a product id and quantity and get calculate this on the backend to avoid people manipulating the cost)
                description: this.description, // optional description that will show up on stripe when looking at payments
            }
            this.sendTokenToServer(this.charge)
        },
        sendTokenToServer(charge) {
            // Send to charge to your backend server to be processed
            // Documentation here: https://stripe.com/docs/api/charges/create
            console.log(charge)
        },
    },
}
</script>
