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
    :type="type"
    :form="form"
    :color="color"
    :to="to"
    :href="href"
    :disabled="disabled"
    @click="onClick"
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
      default: "secondary"
    },
    size: {
      type: String,
      default: "large"
    },
    type: {
      type: String,
      default: "button"
    },
    form: {
      type: String,
      default: undefined
    },
    to: {
      type: String,
      default: undefined
    },
    href: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      if (!this.$props.to) {
        this.$emit("button-click");
      }
    },
    sizeCheck(size) {
      return this.$props.size === size;
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
