<template>
  <v-card :color="color" height="100%" elevation="0" tag="article">
    <v-card-title class="headline">
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
    <v-card-actions v-if="actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Blurb",
  props: {
    actions: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "#fff"
    }
  }
};
</script>
