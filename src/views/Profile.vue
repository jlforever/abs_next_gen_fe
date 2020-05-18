<template>
  <div>
    <h1>Profile</h1>
    <p>{{ JSON.stringify(profile) }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    profile() {
      return this.$store.getters.getProfile;
    }
  }
};
</script>
