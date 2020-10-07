<template>
  <div>
    <div v-if="materials && materials.length > 0">
      <div v-for="(material, i) in materials" :key="i">
        <v-row no-gutters>
          <v-col cols="12">
            <div class="mb-2">
              <v-btn
                depressed
                class="material-button"
                @click="
                  saveSessionFile(material.material_access_url, material.name)
                "
                small
                color="secondary"
              >
                <v-icon class="mr-1" small>{{
                  getFileIcon(material.mime_type)
                }}</v-icon>
                <span class="material-name text-truncate">{{
                  material.name
                }}</span>
                <SessionMaterialDelete
                  v-if="perspective === 'faculty'"
                  :sessionId="sessionId"
                  :courseId="courseId"
                  :material="material"
                />
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
import SessionMaterialDelete from "./SessionMaterialDelete";
import { getFileIcon } from "@/utils/fileUtils";
export default {
  name: "SessionMaterials",
  components: { SessionMaterialDelete },
  props: {
    materials: {
      type: Array,
      default: null
    },
    sessionId: {
      type: Number,
      default: null
    },
    courseId: {
      type: Number,
      default: null
    },
    perspective: {
      type: String,
      default: null
    }
  },
  methods: {
    getFileIcon,
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
.material-button {
  max-width: 100%;
}
.material-name {
  width: 350px;
  @media #{map-get($display-breakpoints, 'xs-only')} {
    max-width: 65vw;
  }
}
</style>