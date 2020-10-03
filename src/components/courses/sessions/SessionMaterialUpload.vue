<template>
  <v-form class="upload-button">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="material"
            color="secondary"
            counter
            filled
            :label="uploadText"
            placeholder="Select File"
            prepend-icon="mdi-paperclip"
            :show-size="1000"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip v-if="index < 2" color="secondary" dark label small>{{
                text
              }}</v-chip>
            </template>
            <template v-slot:append-outer>
              <v-btn
                large
                depressed
                tile
                color="secondary"
                height="57"
                class="ma-0"
                :disabled="!material"
                @click="uploadMaterials"
                >Upload</v-btn
              >
            </template>
          </v-file-input>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import actionTypes from "@/store/actions";
const { courses, errors, success } = actionTypes;
export default {
  name: "SessionMaterialUpload",
  data: () => ({
    material: null,
    successMessage: "File has been successfully uploaded."
  }),
  props: {
    perspective: {
      type: String,
      default: null
    },
    sessionId: {
      type: Number,
      default: null
    },
    courseId: {
      type: Number,
      default: null
    }
  },
  methods: {
    async uploadMaterials() {
      const file = new FormData();
      file.append(
        "student_session_material",
        this.material,
        this.material.name
      );
      try {
        await this.$store.dispatch(courses.sessions.materials.upload, {
          sessionId: this.sessionId,
          courseId: this.courseId,
          file
        });

        this.$store.dispatch(success.snack, this.successMessage);
      } catch (err) {
        this.$store.dispatch(errors.format, err);
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
