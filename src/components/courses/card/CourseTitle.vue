<template>
  <v-list-item three-line>
    <v-list-item-icon>
      <v-icon color="primary">mdi-school</v-icon>
    </v-list-item-icon>
    <v-list-item-content v-if="course.specialty">
      <div class="overline">{{ course.specialty.subject }}</div>
      <v-list-item-title class="headline mb-1">{{ course.specialty.category }}</v-list-item-title>
      <v-list-item-subtitle>{{ course.specialty.focus_areas }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "CourseTitle",
  props: {
    course: {
      type: Object,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list-item__title {
  white-space: normal;
}
</style>