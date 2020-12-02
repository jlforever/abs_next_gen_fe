<template>
    <div>
        <stripe-elements
            v-if="currentPayment > 0"
            ref="elementsRef"
            :pk="publishableKey"
            :amount="currentPayment"
            @token="tokenCreated"
            @loading="loading = $event"
        >
        </stripe-elements>
        <p v-if="currentPayment <= 0">
            Students must be selected before setting up payment information.
        </p>
    </div>
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
    }),
    props: {
        cards: {
            type: Object,
            default: null,
            //tok_1Hu4DWAFlldmIElxBxcd4Yc7
        },
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
            this.$emit('chargeCreated', token)
        },
    },
}
</script>
