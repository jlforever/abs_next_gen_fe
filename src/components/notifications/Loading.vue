<template>
    <v-overlay :value="loading" :z-index="2000">
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
    },
    data() {
        return {
            loading: false,
        }
    },
    created: function () {
        this.$store.watch(
            (state) => state.loading.status,
            () => {
                this.loading = this.$store.state.loading.status
            }
        )
    },
}
</script>
