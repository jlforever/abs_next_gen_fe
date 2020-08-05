<template>
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
          formatDateToLocal(course.effective_from, "dddd", timezone)
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
          timezone
          )
          }}
        </span>
      </v-list-item-subtitle>
      <v-list-item-subtitle class="pb-1">
        <strong>Duration:</strong>
        <span class="pl-2">{{ getWeeks(course.effective_from, course.effective_until) }}</span>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { formatDateToLocal, getWeeks } from "@/utils/timeUtils";

export default {
  name: "CourseTimes",
  components: {},
  props: {
    course: {
      type: Object,
      default: null
    },
    timezone: {
      type: String,
      default: null
    }
  },
  methods: {
    formatDateToLocal,
    getWeeks
  }
};
</script>