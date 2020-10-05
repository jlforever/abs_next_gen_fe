<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">Sessions</v-list-item-title>
        <v-list-item-subtitle v-if="areSessionsEmpty"
          >Class sessions will appear once registered class has been
          paid.</v-list-item-subtitle
        >
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
            <v-icon class="session-time-icon mr-2">{{
              getStatusIcon(session.status)
            }}</v-icon>
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
              <v-list-item-title class="mb-1"
                >Session Materials</v-list-item-title
              >
            </v-list-item-content>
            <SessionMaterials
              v-if="perspective === 'parent'"
              :materials="session.student_materials"
              :perspective="perspective"
            />
            <SessionMaterials
              v-else-if="perspective === 'faculty'"
              :sessionId="session.id"
              :courseId="courseId"
              :materials="session.teaching_session_student_uploads"
              :perspective="perspective"
            />
            <SessionMaterialUpload
              v-if="perspective === 'faculty'"
              :sessionId="session.id"
              :courseId="courseId"
              :perspective="perspective"
            />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import SessionMaterials from "@/components/courses/sessions/SessionMaterials";
import SessionMaterialUpload from "@/components/courses/sessions/SessionMaterialUpload";
import { militaryToStandard, formatDateToLocal } from "@/utils/timeUtils";
export default {
  name: "SessionList",
  components: { SessionMaterials, SessionMaterialUpload },
  props: {
    courseId: {
      type: Number,
      default: null
    },
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
