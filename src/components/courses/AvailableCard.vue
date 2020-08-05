<template>
  <v-card v-if="course" outlined class="course-card">
    <CourseTitle :course="course" />
    <CourseTimes :course="course" :timezone="user.timezone" />
    <CourseTeacher :course="course" />
    <v-card-actions>
      <CourseRegister
        v-if="hasFamilyMembers > 0 && !loadingFamily"
        :course="course"
        :family="family"
        :hasFamilyMembers="hasFamilyMembers"
        :user="user"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import CourseRegister from "@/components/courses/card/CourseRegister";
import CourseService from "@/service/courseService";
import CourseTitle from "@/components/courses/card/CourseTitle";
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
export default {
  name: "AvailableCard",
  components: {
    CourseTitle,
    CourseTimes,
    CourseTeacher,
    CourseRegister
  },
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
    testClicky(id) {
      CourseService.fetchRegisteredCourseSessions(id);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
