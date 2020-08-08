<template>
  <DashboardWrap>
    <v-breadcrumbs class="px-0" :items="items"></v-breadcrumbs>
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
        <v-expansion-panels v-model="panels" multiple hover>
          <v-expansion-panel
            v-for="(session, i) in current.course.sessions"
            :class="session.status"
            :key="i"
          >
            <v-expansion-panel-header>
              <div>
                <v-icon class="session-time-icon mr-2">
                  {{ getStatusIcon(session.status) }}
                </v-icon>
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
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="session-assignments">
                <v-list-item-content>
                  <v-list-item-title class="mb-1">
                    Session Materials
                  </v-list-item-title>
                </v-list-item-content>
                <div
                  v-if="
                    session.student_materials &&
                      session.student_materials.length > 0
                  "
                >
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
//import axios from "axios";
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
      current: null,
      panels: [],
      items: []
    };
  },
  async created() {
    await this.$store.dispatch(courses.sessions, this.$route.params.id);
    this.current = this.registeredCourses[this.$route.params.id];

    Object.entries(this.current.course.sessions).forEach((session, index) => {
      if (session[1].status === "active") this.panels = [...this.panels, index];
    });

    this.items = [
      {
        text: "Courses",
        disabled: false,
        href: "/courses"
      },
      {
        text: this.current.course.specialty.category,
        disabled: true
      }
    ];
  },
  async destroyed() {},
  methods: {
    formatDateToLocal,
    militaryToStandard,
    getFileIcon,
    getStatusIcon(session) {
      switch (session) {
        case "upcoming":
          return "mdi-calendar-clock";
        case "active":
          return "mdi-calendar-check";
        case "passed":
          return "mdi-archive";
        default:
          return "mdi-calendar";
      }
    },
    async saveSessionFile(uri, filename) {
      saveAs(uri, filename);
    }
  },
  computed: {
    ...mapGetters(["activeUser", "registeredCourses"])
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
