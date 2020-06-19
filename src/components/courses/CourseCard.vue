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
        <v-list-item-subtitle class="pb-1">
          <strong>Taught Via:</strong>
          <span class="pl-2">{{ course.taught_via }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Time:</strong>
          <span
            class="pl-2"
          >{{formatDateToLocal(course.effective_from, "dddd", user.timezone)}} {{ course.individual_session_starts_at }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Length:</strong>
          <span class="pl-2">{{ course.per_session_minutes }} Minutes</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Start date:</strong>
          <span
            class="pl-2"
          >{{ formatDateToLocal(course.effective_from, "MMMM Do, YYYY", user.timezone) }}</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Duration:</strong>
          <span class="pl-2">{{ getWeeks(course.effective_from, course.effective_until) }}</span>
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
    <v-card-actions>
      <CourseRegister
        v-if="hasFamilyMembers > 0 && !loadingFamily"
        :course="course"
        :family="family"
        :user="user"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import CourseRegister from "@/components/courses/CourseRegister";
import { formatDateToLocal, getWeeks } from "@/utils/timeUtils";
export default {
  name: "CourseCard",
  components: { CourseRegister },
  props: {
    course: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    family: {
      type: Object,
      default: null
    },
    hasFamilyMembers: {
      type: Number,
      default: 0
    },
    loadingFamily: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    formatDateToLocal,
    getWeeks
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
