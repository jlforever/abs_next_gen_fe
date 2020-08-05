<template>
  <div>
    <strong>Registered for this class</strong>
    <div class="my-2">
      <v-chip
        class="mr-1"
        color="primary"
        outlined
        pill
        v-for="member in registered"
        :key="member.id"
      >{{ member.student.first_name }}</v-chip>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseStudents",
  props: {
    registered: {
      type: Array,
      default: null
    }
  }
};
</script>