<template>
  <v-card v-if="course" outlined class="course-card">
    <v-list-item v-if="type === 'registered'">
      <div class="text-right status">{{ status }}</div>
    </v-list-item>
    <v-list-item three-line>
      <v-list-item-icon>
        <v-icon color="primary">mdi-school</v-icon>
      </v-list-item-icon>
      <v-list-item-content v-if="course.specialty">
        <div class="overline">{{ course.specialty.subject }}</div>
        <v-list-item-title class="headline mb-1">
          {{ course.specialty.category }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ course.specialty.focus_areas }}
        </v-list-item-subtitle>
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
          <span class="pl-2">
            {{
              formatDateToLocal(course.effective_from, "dddd", user.timezone)
            }}
            {{ course.individual_session_starts_at }}
          </span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Length:</strong>
          <span class="pl-2">{{ course.per_session_minutes }} Minutes</span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Start date:</strong>
          <span class="pl-2">
            {{
              formatDateToLocal(
                course.effective_from,
                "MMMM Do, YYYY",
                user.timezone
              )
            }}
          </span>
        </v-list-item-subtitle>
        <v-list-item-subtitle class="pb-1">
          <strong>Duration:</strong>
          <span class="pl-2">
            {{ getWeeks(course.effective_from, course.effective_until) }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <v-icon color="primary">mdi-account-box</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ course.faculty.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ course.faculty.bio }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="type === 'registered'">
      <v-list-item-subtitle>
        <strong>Registered for this class</strong>
        <div class="my-2">
          <v-chip
            class="mr-1"
            color="primary"
            outlined
            pill
            v-for="member in registeredForCourse"
            :key="member.id"
          >
            {{ member.student.first_name }}
          </v-chip>
        </div>
        <div class="my-2" v-if="totalDue > 0">
          <v-divider class="mt-3 mb-2" />
          <strong>Total Due:</strong>
          {{ totalDue | currency }}
          <br />
          <strong>Due Date:</strong>
          {{ formatDateToLocal(totalDueBy, "MMMM Do, YYYY", user.timezone) }}
        </div>
      </v-list-item-subtitle>
    </v-list-item>
    <v-card-actions v-if="type === 'available'">
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
    },
    type: {
      type: String,
      default: null
    },
    registeredIds: {
      type: Array,
      default: () => []
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
.v-card.course-card {
  border-color: $brand-blue;
}
.course-card-footer {
  background: $white-smoke;
}
.status {
  width: 100%;
}
</style>
