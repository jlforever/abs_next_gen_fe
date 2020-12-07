<template>
    <div>
        <stripe-elements
            ref="elementsRef"
            :pk="publishableKey"
            :amount="currentPayment"
            @token="tokenCreated"
            @loading="loading = $event"
        >
        </stripe-elements>
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
