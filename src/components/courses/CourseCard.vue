<template>
  <v-card v-if="course" outlined class="course-card">
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
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary">mdi-alarm</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-subtitle class="pb-2">
          <strong>Taught Via:</strong>
          <span class="pl-2">{{ course.taught_via }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-2">
          <strong>Time:</strong>
          <span class="pl-2">{{ course.individual_session_starts_at }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-2">
          <strong>Start date:</strong>
          <span class="pl-2">{{ course.effective_from }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary">mdi-account-box</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ course.faculty.name}}</v-list-item-title>
        <v-list-item-subtitle>{{ course.faculty.bio}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "CourseCard",
  props: {
    course: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    }
  }
};
</script>
<style lang="scss" scoped>
.v-card.course-card {
  border-color: $brand-blue;
}
.course-card-footer {
  background: $white-smoke;
}
</style>
