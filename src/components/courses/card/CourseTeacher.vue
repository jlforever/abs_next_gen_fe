<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon color="primary">mdi-account-box</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title>{{ course.faculty.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ course.faculty.bio }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "CourseTeacher",
  props: {
    course: {
      type: Object,
      default: null
    }
  }
};
</script>