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
import { getFileIcon } from "@/utils/fileUtils";
export default {
  name: "SessionMaterials",
  props: {
    materials: {
      type: Array,
      default: null
    }
  },
  methods: {
    getFileIcon
  }
};
</script>

<style lang="scss" scoped>
</style>