<template>
  <v-row class="align-self-start fill-height">
    <v-col cols="12">
      <v-card class="fill-height">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <strong class="title">Courses</strong>
                <p>View available courses and register up to 3 family members for each.</p>
              </v-col>
              <v-col cols="12">
                <p
                  v-if="hasCourses <= 0 && !loadingCoursesFetch"
                >No new courses are available at this time.</p>
                <v-row v-else-if="hasCourses > 0 && !loadingCoursesFetch">
                  <v-col v-for="course in availableCourses" :key="course.id" cols="12" md="6">
                    <CourseCard
                      :course="course"
                      :user="activeUser"
                      :family="currentFamilyMembers"
                      :hasFamilyMembers="hasFamilyMembers"
                      :loadingFamily="loadingFamilyMemberFetch"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import CourseCard from "@/components/courses/CourseCard.vue";
import actionTypes from "@/store/actions";
const { courses, family } = actionTypes;
export default {
  name: "Courses",
  metaInfo: {
    title: "Register for available courses"
  },
  components: { CourseCard },
  async created() {
    await this.$store.dispatch(family.request, this.activeUser.email);
    await this.$store.dispatch(courses.request, this.activeUser.email);
  },
  computed: {
    ...mapGetters([
      "hasCourses",
      "loadingCoursesFetch",
      "availableCourses",
      "activeUser",
      "currentFamilyMembers",
      "hasFamilyMembers",
      "loadingFamilyMemberFetch"
    ]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  }
};
</script>

<style lang="scss" scoped></style>
