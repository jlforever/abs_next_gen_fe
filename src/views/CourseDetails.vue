<template>
  <DashboardWrap>
    <v-breadcrumbs class="px-0" :items="items"></v-breadcrumbs>
    <v-card>
      <div v-if="current">
        <CourseFloats :status="current.status" :code="current.course.code" />
        <CourseTitle :course="current.course" />
        <CourseTimes :course="current.course" :timezone="activeUser.timezone" />
        <CourseJoin :status="current.status" :course="current.course" />
        <CourseTeacher :course="current.course" />
        <CourseReleaseAgreement :agreement="current.accept_release_form" />
        <SessionList
          :sessions="current.course.sessions"
          :timezone="activeUser.timezone"
          perspective="parent"
        />
      </div>
    </v-card>
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import CourseTitle from "@/components/courses/card/CourseTitle";
import CourseFloats from "@/components/courses/card/CourseFloats";
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseJoin from "@/components/courses/card/CourseJoin";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
import CourseReleaseAgreement from "@/components/courses/card/CourseReleaseAgreement";
import SessionList from "@/components/courses/sessions/SessionList";
import actionTypes from "@/store/actions";
const { courses } = actionTypes;
export default {
  name: "CourseDetails",
  metaInfo: {
    title: "Course Details"
  },
  components: {
    DashboardWrap,
    CourseTitle,
    CourseFloats,
    CourseTimes,
    CourseJoin,
    CourseTeacher,
    CourseReleaseAgreement,
    SessionList
  },
  data() {
    return {
      current: null,
      items: []
    };
  },
  async created() {
    await this.$store.dispatch(courses.sessions.parent, this.$route.params.id);
    this.current = this.registeredCourses[this.$route.params.id];

    this.items = [
      {
        text: "Courses",
        disabled: false,
        href: "/courses"
      },
      {
        text: this.breadcrumbText,
        disabled: true
      }
    ];
  },
  async destroyed() {},
  computed: {
    ...mapGetters(["activeUser", "registeredCourses"]),
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
