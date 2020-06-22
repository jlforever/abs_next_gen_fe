<template>
  <v-footer dark>
    <div class="app-footer-section">Alpha Beta Academy &copy; 2020</div>
    <v-spacer />
    <div class="app-footer-section">
      <div class="social-buttons">
        <v-btn
          href="http://www.youtube.com/channel/UCzEufCsJkU6JbB4WrtADSsQ"
          color="accent"
          target="_blank"
          icon
        >
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn
          href="https://www.facebook.com/pages/Alpha-Beta-Language-School/706702632687129"
          color="accent"
          target="_blank"
          icon
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn
          href="https://twitter.com/ABLS3"
          color="accent"
          target="_blank"
          icon
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
      </div>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
