<template>
  <v-overlay :value="uploadingMaterials" :z-index="2000">
    <v-progress-circular indeterminate></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Loading",
  computed: {
    ...mapGetters(["uploadingMaterials"])
  }
};
</script>