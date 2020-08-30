<template>
  <v-list-item v-if="status === 'paid'">
    <v-list-item-icon>
      <v-icon color="primary">mdi-webcam</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="overflow-visible">
        <v-btn
          small
          color="secondary"
          class="text-capitalize"
          :href="course.virtual_klass_platform_link"
          target="_blank"
        >
          Join with
          {{ course.taught_via }}
        </v-btn>
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "CourseJoin",
  props: {
    course: {
      type: Object,
      default: null
    },
    status: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
</style>