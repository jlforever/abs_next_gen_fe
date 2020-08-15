<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img aspect-ratio="2" cover :src="heroImage" />
        </v-col>
        <v-col cols="12" md="7">
          <Blurb color="accent">
            <template #title>Welcome to Alpha Beta Academy</template>
            <p>
              Our program is based on the principal that by letting kids fully
              immersed in a foreign environment, they will be quickly picking up
              foreign language listening and communicative skills. We make the
              immersed program fun by having kids participate in fun games,
              addictive and rhythmic music and creative art projects. All
              materials will be included. We hope your child will join us on our
              exciting journey through language learning!
            </p>
          </Blurb>
        </v-col>
        <v-col cols="12" md="5">
          <Blurb actions color="accent">
            <template #title>Who We Are</template>
            <p>
              Who we are and what we do are pretty simple! We are professional
              foreign language teachers who are passionate about teaching
              foreign language to young children. We strive for excellence and
              are always welcoming your feedback!
            </p>
            <template #actions>
              <v-spacer />
              <CardButton size="x-large" href="mailto:admin@alphabetaschool.org">Contact Us</CardButton>
            </template>
          </Blurb>
        </v-col>
      </v-row>
    </v-container>

    <div class="section programs gray">
      <v-container>
        <h2 class="headline mb-3 text-center">Programs</h2>
        <ProgramSlide />
      </v-container>
    </div>

    <div class="section testimonials">
      <v-container>
        <h2 class="headline text-center">Testimonials</h2>
        <v-row align="center">
          <v-col cols="12" md="6">
            <div class="video-container">
              <LazyYoutubeVideo src="https://www.youtube.com/embed/xyI5XjS9L9s" :webp="false" />
            </div>
          </v-col>
          <v-col>
            <TestimonialSlide />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Blurb from "@/components/layouts/Blurb.vue";
import CardButton from "@/components/buttons/CardButton.vue";
import ProgramSlide from "@/components/marketing/ProgramSlide.vue";
import TestimonialSlide from "@/components/marketing/TestimonialSlide.vue";

export default {
  name: "Home",
  components: {
    Blurb,
    CardButton,
    ProgramSlide,
    TestimonialSlide
  },
  data() {
    return {
      videoThumb: require("@/assets/video_thumbnail.png"),
      heroImage: require("@/assets/photos/photo1.jpeg")
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 1.5rem 0;
  &.gray {
    background: $light-gray;
  }
  .headline {
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
}
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
