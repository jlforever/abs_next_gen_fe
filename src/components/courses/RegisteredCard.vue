<template>
  <v-card v-if="course" outlined class="course-card" link :to="`/courses/${registeredCourseId}`">
    <CourseFloats :status="status" :code="course.code" />
    <v-row>
      <v-col md="6">
        <CourseTitle :course="course" />
      </v-col>
      <v-col md="6">
        <CourseTimes :course="course" :timezone="user.timezone" />
        <CourseTeacher :course="course" />
      </v-col>
    </v-row>
    <v-list-item>
      <v-list-item-subtitle>
        <CourseStudents :registered="registeredForCourse" />
        <CoursePaymentDue
          v-if="status === 'pending'"
          :totalDue="totalDue"
          :totalDueBy="totalDueBy"
          :timezone="user.timezone"
        />
      </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
import CourseTitle from "@/components/courses/card/CourseTitle";
import CourseFloats from "@/components/courses/card/CourseFloats";
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
import CourseStudents from "@/components/courses/card/CourseStudents";
import CoursePaymentDue from "@/components/courses/card/CoursePaymentDue";
import { formatDateToLocal, getWeeks } from "@/utils/timeUtils";
export default {
  name: "RegisteredCard",
  components: {
    CourseTitle,
    CourseFloats,
    CourseTimes,
    CourseTeacher,
    CourseStudents,
    CoursePaymentDue
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
    type: {
      type: String,
      default: null
    },
    registeredIds: {
      type: Array,
      default: () => []
    },
    registeredCourseId: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      default: null
    },
    totalDue: {
      type: Number,
      default: null
    },
    totalDueBy: {
      type: String,
      default: null
    }
  },
  methods: {
    formatDateToLocal,
    getWeeks
  },
  computed: {
    registeredForCourse() {
      const regArr = [];
      if (this.registeredIds[0])
        regArr.push(this.family[this.registeredIds[0]]);
      if (this.registeredIds[1])
        regArr.push(this.family[this.registeredIds[1]]);
      if (this.registeredIds[2])
        regArr.push(this.family[this.registeredIds[2]]);
      return regArr;
    }
  }
};
</script>
<style lang="scss" scoped>
.v-card.course-card::v-deep {
  transition: all 500ms ease-in;
  padding-top: 2rem;

  .course-status,
  .v-chip,
  .v-icon {
    transition: all 500ms ease-in;
  }

  &:hover {
    border-color: $brand-pink;
    background: #f9f9f9;
    .course-status,
    .v-chip:not(.v-chip--outlined) {
      background-color: $brand-pink !important;
    }
    .v-chip--outlined {
      border-color: $brand-pink !important;
    }
    .v-chip--outlined,
    .v-icon {
      color: $brand-pink !important;
    }
  }
}
</style>
