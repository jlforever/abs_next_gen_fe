<template>
  <div class="helper">
    <img alt="Vue logo" src="../assets/abs_logo_abstractmark.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
.helper {
  text-align: center;
}
img {
  max-width: 400px;
  width: 50%;
}
</style>
