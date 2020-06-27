<template>
  <v-footer dark>
    <div class="app-footer-section">Alpha Beta Academy &copy; 2020</div>
    <v-spacer />
    <div class="app-footer-section">
      <div class="social-buttons">
        <v-btn
          href="https://www.youtube.com/channel/UCuAv6rdQZRMbFzPg5pURxNA"
          color="accent"
          target="_blank"
          icon
        >
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
        <v-btn
          href="https://www.facebook.com/Alpha-Beta-Academy-103624481335935/"
          color="accent"
          target="_blank"
          icon
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
        <v-btn href="https://twitter.com/AlphaBetaUS" color="accent" target="_blank" icon>
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-btn
          href="https://www.instagram.com/alphabetaacademy/"
          color="accent"
          target="_blank"
          icon
        >
          <v-icon>mdi-instagram</v-icon>
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
