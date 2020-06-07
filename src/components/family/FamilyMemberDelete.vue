<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
        <v-btn absolute text x-small icon right :ripple="false" v-on="on">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Warning
        </v-card-title>
        <v-card-text>
          This action will remove {{ item.student.first_name }}. Would you like
          to proceed?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteFamilyMember()">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import actionTypes from "@/store/actions";
const { family } = actionTypes;
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    deleteFamilyMember() {
      const { item, user } = this.$props;
      const studentParams = {
        first_name: item.student.first_name,
        last_name: item.student.last_name
      };
      this.$store
        .dispatch(family.delete, item.student.id, {
          email: user.email,
          family_member: studentParams
        })
        .then(() => {
          this.dialog = false;
        });
    }
  }
};
</script>
