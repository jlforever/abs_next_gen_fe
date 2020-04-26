<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span class="divider">|</span>
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Footer
  }
};
</script>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $text;
  background: $background-light;
  padding: 0;
  margin: 0;
}

#nav {
  padding: 30px;
  .divider {
    display: inline-block;
    margin: 0 0.25rem;
  }
  a {
    font-weight: bold;
    color: $text-link;

    &.router-link-exact-active {
      color: darken($text-link, 15%);
    }
  }
}
</style>
