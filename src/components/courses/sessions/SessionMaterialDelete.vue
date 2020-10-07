<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-icon class="material-delete" small v-on.stop="on">
        mdi-close
      </v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">Warning</v-card-title>
      <v-card-text>
        This action will remove
        <strong class="primary--text">{{ material.name }}</strong
        >. Would you like to proceed?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="red darken-1" text @click="deleteMaterial">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import actionTypes from "@/store/actions";
const { courses } = actionTypes;
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    material: {
      type: Object,
      default: null
    },
    courseId: {
      type: Number,
      default: null
    },
    sessionId: {
      type: Number,
      default: null
    }
  },
  methods: {
    deleteMaterial() {
      const { material, sessionId, courseId } = this.$props;
      this.$store
        .dispatch(courses.sessions.materials.delete, {
          materialId: material.id,
          sessionId,
          courseId
        })
        .then(() => {
          this.dialog = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.material-delete::v-deep {
  position: relative;
  z-index: 3;
  cursor: pointer;
}
</style>
