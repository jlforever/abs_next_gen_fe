<template>
  <div class="home">
    <v-row>
      <v-col cols="12" lg="4" sm="6">
        <v-img aspect-ratio="1" cover :src="kidsEic" />
      </v-col>
      <v-col cols="12" lg="8" sm="6">
        <h1>Welcome to Alpha Beta Academy</h1>
        <p>
          Our program is based on the principal that by letting kids fully
          immersed in a foreign environment, they will be quickly picking up
          foreign language listening and communicative skills. We make the
          immersed program fun by having kids participate in fun games,
          addictive and rhythmic music and creative art projects. All materials
          will be included. We hope your child will join us on our exciting
          journey through language learning!
        </p>
        <v-divider />
        <h2>Who We Are</h2>
        <p>
          Who we are and what we do are pretty simple! We are professional
          foreign language teachers who are passionate about teaching foreign
          language to young children. We strive for excellence and are always
          welcoming your feedback!
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      kidsEic: require("../assets/photos/kids-eic.jpg")
    };
  }
};
</script>

<style lang="scss"></style>
