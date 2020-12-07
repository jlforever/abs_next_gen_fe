<template>
    <div>
        <v-braintree
            authorization="xxxxxxxxxxxxxxxxxxxxxx"
            @success="onSuccess"
            @error="onError"
        ></v-braintree>
    </div>
</template>

<script>
export default {
    name: 'CoursePayment',
    props: {},
    methods: {
        onSuccess(payload) {
            let nonce = payload.nonce
        },
        onError(error) {
            let message = error.message
            console.log('ERROR ', message)
            // Whoops, an error has occured while trying to get the nonce
        },
    },
}
</script>
