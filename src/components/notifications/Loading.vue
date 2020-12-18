<template>
    <v-overlay :value="isLoading" :z-index="2000">
        <v-progress-circular indeterminate></v-progress-circular>
    </v-overlay>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Loading',
    computed: {
        ...mapGetters([
            'uploadingMaterials',
            'loadingRegisteredCoursesFetch',
            'loadingCardFetch',
        ]),
        isLoading() {
            return (
                this.uploadingMaterials ||
                this.loadingRegisteredCoursesFetch ||
                this.loadingCardFetch
            )
        },
    },
}
</script>
