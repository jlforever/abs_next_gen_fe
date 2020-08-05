<template>
  <div>
    <div class="my-2" v-if="totalDue > 0">
      <v-divider class="mt-3 mb-2" />
      <strong>Total Due:</strong>
      {{ totalDue | currency }}
      <br />
      <strong>Due Date:</strong>
      {{ formatDateToLocal(totalDueBy, "MMMM Do, YYYY", timezone) }}
    </div>
  </div>
</template>

<script>
import { formatDateToLocal } from "@/utils/timeUtils";
export default {
  name: "CoursePaymentDue",
  props: {
    totalDue: {
      type: Number,
      default: null
    },
    totalDueBy: {
      type: String,
      default: null
    },
    timezone: {
      type: String,
      default: null
    }
  },
  methods: {
    formatDateToLocal
  }
};
</script>