<template>
  <v-row class="align-self-start fill-height">
    <v-col cols="12">
      <v-card class="fill-height">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-if="hasRegisteredCourses > 0"
                cols="12"
                class="courses courses-registered"
              >
                <strong class="title">Registered Courses</strong>
                <p>Courses with registered family members.</p>
                <v-row v-if="!loadingRegisteredCoursesFetch">
                  <v-col
                    v-for="item in registeredCourses"
                    :key="item.id"
                    cols="12"
                    md="6"
                  >
                    <CourseCard
                      type="registered"
                      :course="item.course"
                      :user="activeUser"
                      :family="currentFamilyMembers"
                      :hasFamilyMembers="hasFamilyMembers"
                      :loadingFamily="loadingFamilyMemberFetch"
                      :registeredIds="[
                        item.primary_family_member_id,
                        item.secondary_family_member_id,
                        item.tertiary_family_member_id
                      ]"
                      :status="item.status"
                      :totalDue="item.total_due / 100"
                      :totalDueBy="item.total_due_by"
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="courses courses-available">
                <strong class="title">Courses Available</strong>
                <p>View available courses and register family members.</p>
                <p v-if="hasCourses <= 0 && !loadingCoursesFetch">
                  No new courses are available at this time.
                </p>
                <v-row v-else-if="hasCourses > 0 && !loadingCoursesFetch">
                  <v-col
                    v-for="course in availableCourses"
                    :key="course.id"
                    cols="12"
                    md="6"
                  >
                    <CourseCard
                      type="available"
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
      "hasRegisteredCourses",
      "loadingCoursesFetch",
      "loadingRegisteredCoursesFetch",
      "availableCourses",
      "registeredCourses",
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
