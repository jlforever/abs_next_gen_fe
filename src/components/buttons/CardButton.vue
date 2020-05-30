<template>
  <v-btn
    exact
    class="card-button"
    :x-large="sizeCheck('x-large')"
    :large="sizeCheck('large')"
    :small="sizeCheck('small')"
    :x-small="sizeCheck('x-small')"
    tile
    depressed
    :color="color"
    :to="to || undefined"
    @click="onClick || undefined"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: "CardButton",
  props: {
    exact: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "accent"
    },
    size: {
      type: String,
      default: "large"
    },
    to: {
      type: String,
      default: undefined
    },
    onClick: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    sizeCheck(size) {
      return this.size === size;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-button::v-deep {
  &.v-size--x-small {
    padding: 0 9px !important;
  }
  &.v-size--small {
    padding: 0 13px !important;
  }
  &.v-size--large {
    padding: 0 20px !important;
  }
  &.v-size--x-large {
    padding: 0 24px !important;
  }
}
</style>
