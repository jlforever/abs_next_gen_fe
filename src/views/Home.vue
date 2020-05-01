<template>
  <div class="home">
    <sui-grid divided="vertically">
      <sui-grid-row :columns="2">
        <sui-grid-column>
          <sui-image :src="kidsEic" fluid />
        </sui-grid-column>
        <sui-grid-column>
          <h1 is="sui-header">Welcome to Alpha Beta Academy</h1>
          <p>
            Our program is based on the principal that by letting kids fully
            immersed in a foreign environment, they will be quickly picking up
            foreign language listening and communicative skills. We make the
            immersed program fun by having kids participate in fun games,
            addictive and rhythmic music and creative art projects. All
            materials will be included. We hope your child will join us on our
            exciting journey through language learning!
          </p>
          <sui-divider />
          <h2 is="sui-header">Who We Are</h2>
          <p>
            Who we are and what we do are pretty simple! We are professional
            foreign language teachers who are passionate about teaching foreign
            language to young children. We strive for excellence and are always
            welcoming your feedback!
          </p>
        </sui-grid-column>
      </sui-grid-row>
      <sui-grid-row :columns="3">
        <sui-grid-column>1</sui-grid-column>
        <sui-grid-column>2</sui-grid-column>
        <sui-grid-column>3</sui-grid-column>
      </sui-grid-row>
    </sui-grid>
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
