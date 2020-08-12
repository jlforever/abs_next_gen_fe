<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card elevation="1">
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>
              <slot name="title"></slot>
            </v-toolbar-title>
          </v-toolbar>
          <slot />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AuthWrap"
};
</script>

<style lang="scss" scoped>
</style>
