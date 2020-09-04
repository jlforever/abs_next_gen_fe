<template>
  <DashboardWrap>
    <v-card>
      <v-card-text v-if="isProfileLoaded">
        <v-form id="profile" @submit.prevent="handleSubmit">
          <v-container>
            <v-row>
              <v-col cols="12">
                <PerspectiveSelection
                  v-if="isParentAndTeacher"
                  @perspective-change="handlePerspectiveChange"
                />
                <strong class="title">User Info</strong>
                <p>
                  Parent info must be created in order to register students for
                  classes. Please keep information up to date.
                </p>
              </v-col>
              <v-col cols="12" sm="4" md="3">
                <v-sheet color="accent" class="d-flex justify-center py-3 px-2">
                  <v-avatar color="primary" size="100">
                    <v-icon size="60" dark>mdi-account</v-icon>
                    <!-- <img src="https://randomuser.me/api/portraits/men/90.jpg" /> -->
                  </v-avatar>
                </v-sheet>
                <v-select
                  class="mt-7"
                  :value="findTimezone(activeUser.timezone)"
                  @input="updateLocalUser($event, 'timezone')"
                  :items="timezones"
                  item-text="text"
                  item-value="value"
                  filled
                  label="Timezone"
                />
              </v-col>
              <v-col cols="12" sm="8" md="9">
                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.first_name"
                      @input="updateLocalUser($event, 'first_name')"
                      required
                      :rules="firstNameRules"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.last_name"
                      @input="updateLocalUser($event, 'last_name')"
                      required
                      :rules="lastNameRules"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.user_name"
                      @input="updateLocalUser($event, 'user_name')"
                      label="Username"
                      placeholder="Your desired username"
                    />
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      disabled
                      required
                      :value="activeUser.email"
                      @input="updateLocalUser($event, 'email')"
                      label="Email Address"
                    />
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.phone_number"
                      @input="updateLocalUser($event, 'phone_number')"
                      label="Phone Number"
                      placeholder="Your phone number"
                      hint="555-555-55555"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.address1"
                      @input="updateLocalUser($event, 'address1')"
                      label="Street Address"
                      placeholder="The street you live on"
                    />
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.address2"
                      @input="updateLocalUser($event, 'address2')"
                      label="Street Address (continued)"
                      placeholder="Apt, suite, unit, etc"
                    />
                  </v-col>
                  <v-col cols="12" md="5" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.city"
                      @input="updateLocalUser($event, 'city')"
                      label="City"
                      placeholder="City you reside in"
                    />
                  </v-col>
                  <v-col cols="12" md="3" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.state"
                      @input="updateLocalUser($event, 'state')"
                      label="State"
                      placeholder="State you reside in"
                    />
                  </v-col>
                  <v-col cols="12" md="4" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.zip"
                      @input="updateLocalUser($event, 'zip')"
                      label="Zip"
                      placeholder="Your zip/postal code"
                    />
                  </v-col>
                  <v-col
                    v-if="isPerspectiveParent"
                    cols="12"
                    md="6"
                    class="py-0"
                  >
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.parent.emergency_contact"
                      @input="updateLocalUser($event, 'emergency_contact')"
                      label="Emergency Contact Name"
                      placeholder="Enter name for contact"
                    />
                  </v-col>
                  <v-col
                    v-if="isPerspectiveParent"
                    cols="12"
                    md="6"
                    class="py-0"
                  >
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.parent.emergency_contact_phone_number"
                      @input="
                        updateLocalUser(
                          $event,
                          'emergency_contact_phone_number'
                        )
                      "
                      label="Emergency Contact Phone Number"
                      placeholder="Enter contact's phone number"
                    />
                  </v-col>
                  <v-col v-if="isPerspectiveFaculty" cols="12" class="py-0">
                    <v-text-field
                      filled
                      color="secondary"
                      :value="activeUser.faculty.faculty_name"
                      @input="updateLocalUser($event, 'faculty_name')"
                      label="Faculty name"
                      placeholder="Enter teacher name"
                    />
                    <v-textarea
                      filled
                      color="secondary"
                      :value="activeUser.faculty.faculty_bio"
                      @input="updateLocalUser($event, 'faculty_bio')"
                      label="Faculty bio"
                      placeholder="Tell parents and students a bit about yourself"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          type="submit"
          form="profile"
          color="secondary"
          :disabled="!isProfileLoaded || Object.keys(user).length === 0"
        >
          Save Changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </DashboardWrap>
</template>

<script>
import { mapGetters } from "vuex";
import actionTypes from "@/store/actions";
import DashboardWrap from "@/components/layouts/DashboardWrap";
import PerspectiveSelection from "@/components/user/PerspectiveSelection";
import { timezoneList, findTimezone } from "@/utils/timeUtils";
const { users } = actionTypes;
export default {
  pageTitle: "User Info",
  metaInfo: {
    title: "Edit Your User Info"
  },
  components: { DashboardWrap, PerspectiveSelection },
  data() {
    return {
      firstNameRules: [v => !!v || "First Name is required"],
      lastNameRules: [v => !!v || "Last Name is required"],
      timezones: timezoneList,
      user: {},
      loadedSelections: false,
      perspective: null
    };
  },
  computed: {
    ...mapGetters([
      "activeUser",
      "isProfileLoaded",
      "isUserParent",
      "isUserTeacher"
    ]),
    isPerspectiveParent() {
      return this.perspective === "parent";
    },
    isPerspectiveFaculty() {
      return this.perspective === "faculty";
    },
    isParentAndTeacher() {
      return this.isUserParent && this.isUserTeacher;
    }
  },
  async mounted() {
    if (this.activeUser) {
      this.setPerspective();
      await this.buildSelectionInit();
      this.loadedSelections = true;
    } else {
      this.loadedSelections = true;
    }
  },
  methods: {
    updateLocalUser(value, key) {
      this.$set(this.user, key, value);
    },
    handlePerspectiveChange(perspective) {
      this.perspective = perspective;
      console.log(perspective);
    },
    setPerspective() {
      if (this.isUserTeacher && !this.isUserParent) {
        this.perspective = "faculty";
      } else {
        this.perspective = "parent";
      }
    },
    async buildSelectionInit() {
      if (this.activeUser) {
        await Object.keys(this.activeUser).forEach(key => {
          if (
            this.handleRoleKeyCheck(key) &&
            this.handleNoChangeKeyCheck(key) &&
            this.activeUser[key]
          ) {
            this.$set(this.user, key, this.activeUser[key]);
          }
        });
        this.buildDeepSelectionInit();
      }
    },
    async buildDeepSelectionInit() {
      await Object.keys(this.activeUser[this.perspective]).forEach(key => {
        if (
          this.handleTimeKeyCheck(key) &&
          this.activeUser[this.perspective][key]
        )
          this.$set(this.user, key, this.activeUser[this.perspective][key]);
      });
    },
    handleRoleKeyCheck(key) {
      return key !== "parent" && key !== "faculty";
    },
    handleTimeKeyCheck(key) {
      return key !== "created_at" && key !== "updated_at";
    },
    handleNoChangeKeyCheck(key) {
      return key !== "email" && key !== "slug";
    },
    handleSubmit() {
      this.$store.dispatch(users.update, {
        profile: this.user,
        perspective: this.perspective
      });
    },
    findTimezone: findTimezone
  }
};
</script>

<style lang="scss" scoped>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: $brand-blue;
}
.v-text-field.v-input--has-state > .v-input__control > .v-input__slot:before {
  border-color: currentColor;
}
.v-card__actions {
  padding: 0 28px 28px;
}
</style>
