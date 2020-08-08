<template>
  <DashboardWrap>
    <v-card class="fill-height">
      <div v-if="current">
        <CourseTitle :course="current.course" />
        <CourseTimes :course="current.course" :timezone="activeUser.timezone" />
        <CourseTeacher :course="current.course" />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1 jkhkj">
              Sessions
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-expansion-panels multiple hover>
          <v-expansion-panel
            v-for="(session, i) in current.course.sessions"
            :key="i"
          >
            <v-expansion-panel-header>
              {{
                formatDateToLocal(
                  session.effective_for,
                  "MMMM Do, YYYY",
                  activeUser.timezone
                )
              }}
              {{
                militaryToStandard(
                  session.individual_session_starts_at,
                  activeUser.timezone
                )
              }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="session-assignments">
                <v-list-item-content>
                  <v-list-item-title class="mb-1">
                    Session Materials
                  </v-list-item-title>
                </v-list-item-content>
                <div v-if="session.student_materials.length > 0">
                  <div
                    v-for="(studentMaterial, j) in session.student_materials"
                    :key="j"
                  >
                    <v-row no-gutters>
                      <v-col cols="12">
                        <div class="mb-2">
                          <v-btn
                            depressed
                            @click="
                              saveSessionFile(
                                studentMaterial.material_access_url,
                                studentMaterial.name
                              )
                            "
                            small
                            color="secondary"
                          >
                            <v-icon class="mr-1" small>
                              {{ getFileIcon(studentMaterial.mime_type) }}
                            </v-icon>
                            {{ studentMaterial.name }}
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </div>
                <div v-else>
                  <p>Currently no materials for this session.</p>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-card>
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import { saveAs } from "file-saver";
import axios from "axios";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import CourseTitle from "@/components/courses/card/CourseTitle";
import CourseTimes from "@/components/courses/card/CourseTimes";
import CourseTeacher from "@/components/courses/card/CourseTeacher";
import actionTypes from "@/store/actions";
import { getFileIcon } from "@/utils/fileUtils";
import { militaryToStandard, formatDateToLocal } from "@/utils/timeUtils";
const { courses } = actionTypes;
export default {
  name: "CourseDetails",
  metaInfo: {
    title: "Course Details"
  },
  components: { DashboardWrap, CourseTitle, CourseTimes, CourseTeacher },
  data() {
    return {
      current: null
    };
  },
  async created() {
    await this.$store.dispatch(courses.sessions, this.$route.params.id);
    this.current = this.registeredCourses[this.$route.params.id];
  },
  async destroyed() {},
  methods: {
    formatDateToLocal,
    militaryToStandard,
    getFileIcon,
    async saveSessionFile(uri, filename) {
      const blob = await axios({
        method: "get",
        url: uri,
        responseType: "blob"
      });
      console.log("file --- ", filename);
      console.log("blob --- ", blob);
      console.log("save --- ", saveAs);
      /*console.log(blob);
      if (uri === "Rewrewrwerew") {
        fetch(uri)
          .then(res => res.blob())
          .then(blob => {
            saveAs(blob, filename);
          });
      }*/
    }
  },
  computed: {
    ...mapGetters(["activeUser", "registeredCourses"])
  }
};
</script>

<style lang="scss" scoped></style>
