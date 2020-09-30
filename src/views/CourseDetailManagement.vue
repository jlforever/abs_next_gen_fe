<template>
  <DashboardWrap>
    <v-breadcrumbs class="px-0" :items="items"></v-breadcrumbs>
    <v-card>
      <div v-if="current">
        <CourseTitle :course="current" />
        <CourseTimes :course="current" :timezone="activeUser.timezone" />
        <CourseTeacher :course="current" />
        <SessionList
          :sessions="current.sessions"
          perspective="faculty"
          :timezone="activeUser.timezone"
        />
      </div>
    </v-card>
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import CourseTitle from "@/components/courses/card/CourseTitle";
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
import SessionList from "@/components/courses/sessions/SessionList";
import actionTypes from "@/store/actions";
const { courses } = actionTypes;
export default {
  name: "CourseDetailManagement",
  metaInfo: {
    title: "Course Details"
  },
  components: {
    DashboardWrap,
    CourseTitle,
    CourseTimes,
    CourseTeacher,
    SessionList
  },
  data() {
    return {
      current: null,
      items: []
    };
  },
  async created() {
    await this.$store.dispatch(courses.sessions.faculty, this.$route.params.id);
    this.current = this.facultyCourses[this.$route.params.id];

    this.items = [
      {
        text: "Course Management",
        disabled: false,
        href: "/courses/manage"
      },
      {
        text: this.breadcrumbText,
        disabled: true
      }
    ];
  },
  async destroyed() {},
  computed: {
    ...mapGetters(["activeUser", "facultyCourses"]),
    breadcrumbText() {
      return this?.current?.specialty?.category;
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-expansion-panels .v-expansion-panel {
  &.passed {
    background-color: #f7f7f7;
  }
}
.session-time-icon {
  &.mdi-calendar-clock {
    color: rgba(0, 0, 0, 0.87);
  }
  &.mdi-calendar-check {
    color: $brand-pink;
  }
}
</style>
