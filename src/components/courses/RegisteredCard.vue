<template>
  <v-card
    v-if="course"
    outlined
    class="course-card"
    link
    :to="`/courses/${registeredCourseId}`"
  >
    <v-chip class="status" small :ripple="false" :color="statusColor">
      {{ status }}
    </v-chip>
    <v-row>
      <v-col>
        <CourseTitle :course="course" />
      </v-col>
      <v-col>
        <CourseTimes :course="course" :timezone="user.timezone" />
      </v-col>
      <v-col>
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
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
import CourseStudents from "@/components/courses/card/CourseStudents";
import CoursePaymentDue from "@/components/courses/card/CoursePaymentDue";
import { formatDateToLocal, getWeeks } from "@/utils/timeUtils";
export default {
  name: "RegisteredCard",
  components: {
    CourseTitle,
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
    },
    statusColor() {
      if (this.$props.status === "paid") return "primary";
      return "secondary";
    },
    async func(url) {
      let file = await fetch(url)
        .then(r => r.blob())
        .then(
          blobFile =>
            new File([blobFile], "fileNameGoesHere", {
              type: "image/png"
            })
        );

      return file;
    }
  }
};
</script>
<style lang="scss" scoped>
.v-card.course-card::v-deep {
  transition: all 500ms ease-in;
  padding-top: 2rem;

  .status,
  .v-chip,
  .v-icon {
    transition: all 500ms ease-in;
  }

  .status {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }

  &:hover {
    border-color: $brand-pink;
    background: #f9f9f9;
    .status,
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
