<template>
  <v-row class="align-self-start fill-height">
    <v-col cols="12">
      <v-card class="fill-height">
        <v-card-text>
          <FamilyMemberForm />
          <v-container>
            <v-row>
              <v-col cols="12">
                <strong class="title">Family Members</strong>
                <p>
                  Add and manage your family members that will be taking
                  classes.
                </p>
              </v-col>
              <v-col cols="12">
                <p v-if="hasFamilyMembers <= 0 && !loadingFamilyMemberFetch">
                  No family members have been added at this time.
                </p>
                <v-row
                  v-else-if="hasFamilyMembers > 0 && !loadingFamilyMemberFetch"
                >
                  <v-col
                    v-for="item in currentFamilyMembers"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    lg="4"
                    xl="3"
                  >
                    <FamilyMemberCard :item="item" :user="activeUser" />
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
import FamilyMemberCard from "@/components/family/FamilyMemberCard.vue";
const { family } = actionTypes;
export default {
  name: "FamilyMembers",
  metaInfo: {
    title: "Manage Your Family Members"
  },
  components: { FamilyMemberForm, FamilyMemberCard },
  created() {
    this.$store.dispatch(family.request, this.activeUser.email);
  },
  computed: {
    ...mapGetters([
      "currentFamilyMembers",
      "hasFamilyMembers",
      "loadingFamilyMemberFetch",
      "activeUser"
    ]),
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  }
};
</script>

<style lang="scss" scoped></style>
