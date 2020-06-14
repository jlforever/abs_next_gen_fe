<template>
  <h1 class="title">Welcome, {{ activeUser.first_name }}!</h1>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  pageTitle: "Dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  computed: {
    ...mapGetters(["activeUser"])
  }
};
</script>

<style lang="scss" scoped></style>
