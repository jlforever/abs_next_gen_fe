<template>
  <DashboardWrap>
    <v-card class="fill-height">
      <h1>Course Detail {{ $route.params.id }}</h1>
      {{ JSON.stringify(currentCourse) }}
      <CourseTitle :course="currentCourse.course" />
      <CourseTimes :course="currentCourse.course" :timezone="activeUser.timezone" />
      <CourseTeacher :course="currentCourse.course" />
      <v-expansion-panels multiple hover>
        <v-expansion-panel v-for="(session , i) in currentCourse.course.details" :key="i">
          <v-expansion-panel-header>{{session.effective_for}} {{session.individual_session_starts_at}}</v-expansion-panel-header>
          <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import CourseTitle from "@/components/courses/card/CourseTitle";
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
import actionTypes from "@/store/actions";
const { courses } = actionTypes;
export default {
  name: "CourseDetails",
  metaInfo: {
    title: "Course Details"
  },
  components: { DashboardWrap, CourseTitle, CourseTimes, CourseTeacher },
  data() {
    return {
      currentCourse: null
    };
  },
  async created() {
    console.log(this.$route.params.id);
    await this.$store.dispatch(courses.details, this.$route.params.id);
    this.currentCourse = this.registeredCourses[this.$route.params.id];
  },
  async destroyed() {},
  computed: {
    ...mapGetters(["activeUser", "registeredCourses"])
  }
};
</script>

<style lang="scss" scoped>
</style>
