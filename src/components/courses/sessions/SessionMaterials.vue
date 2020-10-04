<template>
  <div>
    <div v-if="materials && materials.length > 0">
      <div v-for="(material, i) in materials" :key="i">
        <v-row no-gutters>
          <v-col cols="12">
            <div class="mb-2">
              <v-btn
                depressed
                @click="
                  saveSessionFile(material.material_access_url, material.name)
                "
                small
                color="secondary"
              >
                <v-icon class="mr-1" small>{{
                  getFileIcon(material.mime_type)
                }}</v-icon>
                {{ material.name }}
                <v-icon
                  v-if="perspective === 'faculty'"
                  @click.stop="deleteMaterial(material)"
                  class="close-button ml-1"
                  small
                  >mdi-close</v-icon
                >
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div v-else>
      <p>Currently no materials for this session.</p>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { getFileIcon } from "@/utils/fileUtils";
export default {
  name: "SessionMaterials",
  props: {
    materials: {
      type: Array,
      default: null
    },
    perspective: {
      type: String,
      default: null
    }
  },
  methods: {
    getFileIcon,
    async deleteMaterial() {
      alert("hi");
    },
    async saveSessionFile(uri, filename) {
      /*** COME BACK TO THIS LATER
       * async func(url) {
      let file = await fetch(url)
        .then(r => r.blob())
        .then(
          blobFile =>
            new File([blobFile], "fileNameGoesHere", {
              type: "image/png"
            })
        );

      return file;
      }
      ***/
      saveAs(uri, filename);
    }
  }
};
</script>

<style lang="scss" scoped>
.close-button::v-deep {
  position: relative;
  z-index: 3;
  cursor: pointer;
}
</style>