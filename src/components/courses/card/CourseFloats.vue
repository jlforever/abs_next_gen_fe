<template>
  <div class="course-floats">
    <div v-if="code" class="course-code">{{ code }}</div>
    <v-chip
      v-if="status"
      class="course-status"
      small
      :ripple="false"
      :color="statusColor"
    >{{ status }}</v-chip>
  </div>
</template>

<script>
export default {
  name: "CourseFloats",
  props: {
    status: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: null
    }
  },
  computed: {
    statusColor() {
      if (this.$props.status === "paid") return "primary";
      return "secondary";
    }
  }
};
</script>

<style lang="scss" scoped>
.course-floats {
  display: flex;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;

  .course-status {
    margin-left: 1rem;
  }
}
</style>