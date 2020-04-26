<template>
  <footer class="app-footer">
    <div class="app-footer-section">Alpha Beta Academy</div>
    <div class="app-footer-section">&copy; 2020</div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="scss">
.app-footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: $background-dark;
  color: $text-light;
}
</style>
