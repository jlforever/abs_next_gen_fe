<template>
  <v-col cols="12" sm="12">
    <v-row align="center" no-gutters>
      <v-col cols="12" sm="7" md="6" lg="5">
        <v-row align="center">
          <v-col class="shrink">
            <v-item-group v-model="programSlide" mandatory tag="v-flex">
              <v-item v-for="n in programLength" :key="n" v-slot:default="{ active, toggle }">
                <div>
                  <v-btn :input-value="active" icon @click="toggle">
                    <v-icon>mdi-record</v-icon>
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>
          </v-col>
          <v-col class="pt-0">
            <v-window v-model="programSlide" class="elevation-1" vertical>
              <v-window-item>
                <v-card flat color="grey lighten-3">
                  <v-card-text>
                    <strong class="title primary--text">Foreign Language Immersed Program</strong>
                    <p>Our program is based on the principal that by letting kids fully immersed in a foreign language environment, they will be quickly picking up foreign language listening and communicative skills. We make the immersed program fun by having kids participate in fun games, addictive and rhythmic music and creative art projects. All materials will be included. We hope your child will join us on our exciting journey through language learning!</p>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item>
                <v-card flat color="grey lighten-3">
                  <v-card-text>
                    <strong class="title primary--text">Virtual Chinese Class</strong>
                    <p>In the virtual classrooms of Alpha Beta Academy's Chinese class, we use Zoom to teach children Mandarin Chinese. The classes have been designed and developed by a team of professional Chinese teachers. All of our teachers have experiences conducting lessons to children coming from a diverse set of language backgrounds. The virtual classes are Chinese immersed. The curriculum is designed to inspire the interests of children, and expand their attention span.</p>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item>
                <v-card flat color="grey lighten-3">
                  <v-card-text>
                    <strong class="title primary--text">Virtual Spanish Class</strong>
                    <p>In the virtual classrooms of Alpha Beta Academy's Spanish class, we use Zoom to teach children Espanol. Each session will be filled with insightful dictations and visuals. Children will be expected to interact with the instructor through Espanol rhymes and songs. Hands on experiences making Hispanic cultural based crafts and art works will be a central part of the learning curriculum. Our Spanish teacher has many years of experiences teaching in private schools and is looking forward to inspire children's interests in acquiring speaking, reading and writing skills in Espanol!</p>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="5" md="6" lg="7">
        <v-img :src="test4" aspect-ratio="1.75" cover></v-img>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "ProgramSlide",
  data() {
    return {
      test4: require("@/assets/photos/testimonial-pic4.jpeg"),
      programSlide: 0,
      programLength: 3
    };
  }
};
</script>
