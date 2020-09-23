<template>
  <v-form class="upload-button">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="materials"
            color="secondary"
            counter
            filled
            :label="uploadText"
            multiple
            placeholder="Select File"
            prepend-icon="mdi-paperclip"
            :show-size="1000"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip v-if="index < 2" color="secondary" dark label small>{{ text }}</v-chip>

              <span
                v-else-if="index === 2"
                class="overline grey--text text--darken-3 mx-2"
              >+{{ materials.length - 2 }} File(s)</span>
            </template>
            <template v-slot:append-outer>
              <v-btn
                large
                depressed
                tile
                color="secondary"
                height="57"
                class="ma-0"
                :disabled="materials.length === 0"
                @click="uploadMaterials"
              >Upload</v-btn>
            </template>
          </v-file-input>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import actionTypes from "@/store/actions";
const { courses } = actionTypes;
export default {
  name: "SessionMaterialUpload",
  data: () => ({
    materials: []
  }),
  props: {
    perspective: {
      type: String,
      default: null
    }
  },
  methods: {
    async uploadMaterials() {
      for (const material of this.materials) {
        console.log(material);
        const params = new FormData();
        //params.append("key", data)
        this.$store.dispatch(courses.sessions.upload, params).then(test => {
          console.log("testing results:  ", test);
        });
      }
    }
  },
  computed: {
    uploadText() {
      switch (this.perspective) {
        case "parent":
          return "Add completed assignments";
        case "faculty":
          return "Add assignments for student";
        default:
          return "Add assignments";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-button::v-deep .v-input__append-outer {
  margin: 0;
}
</style>
