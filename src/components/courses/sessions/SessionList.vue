<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Sessions</v-list-item-title>
        <v-list-item-subtitle v-if="areSessionsEmpty">
          Class sessions will appear once registered class has been paid.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-expansion-panels v-model="panels" multiple hover>
      <v-expansion-panel
        v-for="(session, i) in sessions"
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
                timezone
              )
            }}
            {{
              militaryToStandard(session.individual_session_starts_at, timezone)
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
            <SessionMaterialUpload :perspective="perspective" />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import SessionMaterialUpload from "@/components/courses/sessions/SessionMaterialUpload";
import { getFileIcon } from "@/utils/fileUtils";
import { militaryToStandard, formatDateToLocal } from "@/utils/timeUtils";
export default {
  name: "SessionList",
  components: { SessionMaterialUpload },
  props: {
    sessions: {
      type: Object,
      default: null
    },
    perspective: {
      type: String,
      default: null
    },
    timezone: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      panels: []
    };
  },
  async created() {
    Object.entries(this.sessions).forEach((session, index) => {
      if (session[1].status === "active") this.panels = [...this.panels, index];
    });
  },
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
      /*** COME BACK TO THIS LATER
       * async func(url) {
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
      ***/
      saveAs(uri, filename);
    }
  },
  computed: {
    areSessionsEmpty() {
      return (
        Object.entries(this.sessions).length === 0 &&
        this.perspective === "parent"
      );
    }
  }
};
</script>
