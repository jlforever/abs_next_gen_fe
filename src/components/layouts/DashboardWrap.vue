<template>
  <v-container fluid class="d-flex flex-column flex-grow-1">
    <v-row class="fill-height">
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardWrap"
};
</script>

<style lang="scss" scoped></style>
