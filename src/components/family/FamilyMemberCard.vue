<template>
  <v-card v-if="item" color="primary lighten-3 container py-0" dark flat>
    <FamilyMemberDelete :item="item" :user="user" />
    <v-row>
      <v-col class="shrink">
        <v-icon left>mdi-school</v-icon>
      </v-col>
      <v-col class="pl-0">
        <v-card-text class="pa-0">
          <h3 class="subtitle pb-1">
            {{ item.student.first_name }}
            {{ item.student.last_name }}
          </h3>
          <div>
            <strong>Age:</strong>
            {{ item.student.age }}
          </div>
          <div>
            <strong>Nickname:</strong>
            {{ item.student.nickname }}
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import FamilyMemberDelete from "@/components/family/FamilyMemberDelete.vue";
export default {
  name: "FamilyMemberCard",
  components: { FamilyMemberDelete },
  props: {
    item: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    }
  }
};
</script>
