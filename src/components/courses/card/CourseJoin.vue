<template>
    <v-list-item v-if="status === 'paid' && course.virtual_klass_platform_link">
        <v-list-item-icon>
            <v-icon color="primary">mdi-webcam</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title>
                <v-btn
                    small
                    depressed
                    color="secondary"
                    class="join-btn"
                    @click.stop="
                        openCallLink(course.virtual_klass_platform_link)
                    "
                >
                    Join with
                    {{ course.taught_via }}
                </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle>{{ getUrlText }}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    name: 'CourseJoin',
    props: {
        course: {
            type: Object,
            default: null,
        },
        status: {
            type: String,
        },
    },
    methods: {
        openCallLink(url) {
            window.open(url, '_blank')
        },
    },
    computed: {
        getUrlText() {
            return this.course.virtual_klass_platform_link.replace(
                /(^\w+:|^)\/\//,
                ''
            )
        },
    },
}
</script>

<style lang="scss" scoped>
.join-btn {
    text-transform: none;
}
</style>
