<template>
  <v-col cols="12" sm="12" class="pa-0">
    <v-card color="primary lighten-3" flat dark>
      <v-window v-model="onboarding">
        <v-window-item
          v-for="testimonial in testimonialList"
          :key="`card-${testimonial.name}`"
        >
          <v-card color="transparent" flat>
            <v-card-text class="text-justify pb-0">
              <v-container>
                <v-row align="start">
                  <v-col sm="6" md="4">
                    <v-img aspect-ratio="0.75" :src="testimonial.img" />
                  </v-col>
                  <v-col class="grow">
                    <div>"{{ testimonial.content }}"</div>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <h2 class="headline text-center">
                      - {{ testimonial.name }}
                    </h2>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between pt-0">
        <v-btn text @click="prev">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group v-model="onboarding" class="text-center" mandatory>
          <v-item
            v-for="n in length"
            :key="`btn-${n}`"
            v-slot:default="{ active, toggle }"
          >
            <v-btn :input-value="active" icon @click="toggle">
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn text @click="next">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { testimonials } from "@/utils/marketingUtils";
export default {
  name: "TestimonialSlide",
  data: () => ({
    length: 3,
    onboarding: 0,
    testimonialList: testimonials
  }),
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1;
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1;
    }
  }
};
</script>
