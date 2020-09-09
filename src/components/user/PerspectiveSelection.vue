<template>
  <v-btn-toggle
    class="perspective-selection"
    v-model="perspective"
    tile
    color="primary"
    mandatory
    group
    @change="handleChange"
  >
    <v-btn value="parent">
      Parent
    </v-btn>
    <v-btn value="faculty">
      Faculty
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: "PerspectiveSelection",
  data() {
    return {
      perspective: "parent"
    };
  },
  methods: {
    handleChange(perspective) {
      this.$emit("perspective-change", perspective);
    }
  }
};
</script>

<style lang="scss" scoped>
.perspective-selection {
  display: block;
  .v-btn:first-child {
    margin-left: 0;
  }
}
</style>
