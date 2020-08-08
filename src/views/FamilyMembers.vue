<template>
  <DashboardWrap>
    <v-card class="fill-height">
      <v-card-text>
        <FamilyMemberForm />
        <v-container>
          <v-row>
            <v-col cols="12">
              <strong class="title">Students</strong>
              <p>Add and manage students that will be taking classes.</p>
            </v-col>
            <v-col cols="12">
              <p
                v-if="hasFamilyMembers <= 0 && !loadingFamilyMemberFetch"
              >No students have been added at this time.</p>
              <v-row v-else-if="hasFamilyMembers > 0 && !loadingFamilyMemberFetch">
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
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import actionTypes from "@/store/actions";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import FamilyMemberForm from "@/components/family/FamilyMemberForm";
import FamilyMemberCard from "@/components/family/FamilyMemberCard";
const { family } = actionTypes;
export default {
  name: "FamilyMembers",
  metaInfo: {
    title: "Manage Your Family Members"
  },
  components: { DashboardWrap, FamilyMemberForm, FamilyMemberCard },
  async created() {
    await this.$store.dispatch(family.request, this.activeUser.email);
  },
  computed: {
    ...mapGetters([
      "currentFamilyMembers",
      "hasFamilyMembers",
      "loadingFamilyMemberFetch",
      "activeUser"
    ])
  }
};
</script>

<style lang="scss" scoped></style>
