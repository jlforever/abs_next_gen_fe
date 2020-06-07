<template>
  <v-card>
    <v-card-text v-if="isProfileLoaded">
      <v-form id="profile" @submit.prevent="handleSubmit">
        <v-container>
          <v-row>
            <v-col cols="12">
              <strong class="title">Profile</strong>
              <p>
                A profile must be created in order to take classes. Please keep
                information up to date.
              </p>
            </v-col>
            <v-col cols="12" sm="4" md="3">
              <v-sheet
                color="accent"
                class="d-flex justify-center mt-3 py-3 px-2"
              >
                <v-avatar color="primary" size="100">
                  <v-icon size="60" dark>mdi-account</v-icon>
                  <!-- <img src="https://randomuser.me/api/portraits/men/90.jpg" /> -->
                </v-avatar>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="8" md="9">
              <v-row>
                <v-col cols="12" md="6">
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
                <v-col cols="12" md="6">
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
                <v-col cols="12" md="4">
                  <v-text-field
                    filled
                    color="secondary"
                    :value="activeUser.user_name"
                    @input="updateLocalUser($event, 'user_name')"
                    label="Username"
                    placeholder="Your desired username"
                  />
                </v-col>
                <v-col cols="12" md="4">
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
                <v-col cols="12" md="4">
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
                <v-col cols="12" md="6">
                  <v-text-field
                    filled
                    color="secondary"
                    v-if="isParentFieldLoaded"
                    :value="activeUser.parent.address1"
                    @input="updateLocalUser($event, 'address1')"
                    label="Street Address"
                    placeholder="The street you live on"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    filled
                    color="secondary"
                    v-if="isParentFieldLoaded"
                    :value="activeUser.parent.address2"
                    @input="updateLocalUser($event, 'address2')"
                    label="Street Address (continued)"
                    placeholder="Apt, suite, unit, etc"
                  />
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    filled
                    color="secondary"
                    v-if="isParentFieldLoaded"
                    :value="activeUser.parent.city"
                    @input="updateLocalUser($event, 'city')"
                    label="City"
                    placeholder="City you reside in"
                  />
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    filled
                    color="secondary"
                    v-if="isParentFieldLoaded"
                    :value="activeUser.parent.state"
                    @input="updateLocalUser($event, 'state')"
                    label="State"
                    placeholder="State you reside in"
                  />
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    filled
                    color="secondary"
                    v-if="isParentFieldLoaded"
                    :value="activeUser.parent.zip"
                    @input="updateLocalUser($event, 'zip')"
                    label="Zip"
                    placeholder="Your zip/postal code"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    filled
                    color="secondary"
                    :value="activeUser.emergency_contact"
                    @input="updateLocalUser($event, 'emergency_contact')"
                    label="Emergency Contact Name"
                    placeholder="Enter name for contact"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    filled
                    color="secondary"
                    :value="activeUser.emergency_contact_phone_number"
                    @input="
                      updateLocalUser($event, 'emergency_contact_phone_number')
                    "
                    label="Emergency Contact Phone Number"
                    placeholder="Enter contact's phone number"
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
        :disabled="!isProfileLoaded"
      >
        Save Changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import actionTypes from "@/store/actions";
const { users } = actionTypes;
export default {
  pageTitle: "Profile",
  metaInfo: {
    title: "Edit Your Profile"
  },
  data() {
    return {
      firstNameRules: [v => !!v || "First Name is required"],
      lastNameRules: [v => !!v || "Last Name is required"],
      user: {}
    };
  },
  computed: {
    ...mapGetters(["activeUser", "isProfileLoaded"]),
    isParentFieldLoaded() {
      return this.activeUser?.parent;
    }
  },
  methods: {
    updateLocalUser(value, key) {
      this.$set(this.user, key, value);
    },
    handleSubmit() {
      this.$store.dispatch(users.update, { profile: this.user });
    }
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
