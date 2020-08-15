<template>
  <v-list-item
    v-if="agreement"
    class="caption"
  >* You have authorized ABA to use photographs AND/OR audio/visual of your child</v-list-item>
</template>

<script>
export default {
  name: "CourseReleaseAgreement",
  props: {
    agreement: {
      type: Boolean,
      default: false
    }
  }
};
</script>