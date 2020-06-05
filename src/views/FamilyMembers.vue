<template>
  <v-row class="align-self-start fill-height">
    <v-col cols="12">
      <v-card class="fill-height">
        <v-card-text>
          <FamilyMemberForm />
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="3">
                <strong class="title">Family Members</strong>
                <p>Add and manage your family members that will be taking classes.</p>
              </v-col>
              <v-col cols="12" sm="8" md="9">
                <p v-if="hasFamilyMembers <= 0">No family members have been added at this time.</p>
                <v-row v-else>
                  <v-col
                    v-for="item in currentFamilyMembers"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    lg="4"
                    xl="3"
                  >
                    <v-card color="primary lighten-3" dark flat>
                      <v-card-title>
                        <v-icon left>mdi-school</v-icon>
                        <span class="title">{{item.student.first_name}} {{item.student.last_name}}</span>
                      </v-card-title>
                      <v-card-text>
                        <div>
                          <strong>Age:</strong>
                          {{item.student.age}}
                        </div>
                        <div>
                          <strong>Nickname:</strong>
                          {{item.student.nickname}}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import actionTypes from "@/store/actions";
import FamilyMemberForm from "@/components/family/FamilyMemberForm.vue";
const { family } = actionTypes;
export default {
  name: "FamilyMembers",
  components: { FamilyMemberForm },
  created() {
    this.$store.dispatch(family.request, this.activeUser.email);
  },
  computed: {
    ...mapGetters(["currentFamilyMembers", "hasFamilyMembers", "activeUser"]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
