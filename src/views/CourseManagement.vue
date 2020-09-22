<template>
  <DashboardWrap>
    <v-card class="fill-height">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="courses courses-registered">
              <strong class="title">Course Management</strong>
              <p>Manage courses and upload assignments.</p>
              <p v-if="hasFacultyCourses <= 0 && !loadingCoursesFetch">
                No new courses to manage.
              </p>
              <v-row v-else-if="hasFacultyCourses > 0 && !loadingCoursesFetch">
                <v-col
                  v-for="course in facultyCourses"
                  :key="course.id"
                  cols="12"
                >
                  <RegisteredCard
                    :course="course"
                    :courseLink="`${course.id}/manage`"
                    :user="activeUser"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import RegisteredCard from "@/components/courses/RegisteredCard.vue";
import actionTypes from "@/store/actions";
const { courses } = actionTypes;
export default {
  name: "CourseManagement",
  metaInfo: {
    title: "Manage and upload assignments"
  },
  components: { DashboardWrap, RegisteredCard },
  async created() {
    await this.$store.dispatch(courses.request, {
      user_email: this.activeUser.email,
      perspective: "faculty"
    });
  },
  computed: {
    ...mapGetters([
      "hasFacultyCourses",
      "loadingCoursesFetch",
      "facultyCourses",
      "activeUser",
      "currentFamilyMembers",
      "hasFamilyMembers"
    ]),
    computedDateFormatted() {
      return this.formatDateToLocal(this.date);
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
