<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                color="accent"
                v-model="profile.first_name"
                required
                :rules="firstNameRules"
                label="First Name"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                color="accent"
                v-model="profile.last_name"
                required
                :rules="lastNameRules"
                label="Last Name"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field color="accent" v-model="profile.username" label="Username" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                color="accent"
                disabled
                required
                v-model="profile.email"
                label="Email Address"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field color="accent" v-model="profile.phone_number" label="Phone Number" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                color="accent"
                v-model="profile.parent.address1"
                label="Street Address"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                color="accent"
                v-model="profile.parent.address2"
                label="Street Address (continued)"
              />
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field color="accent" v-model="profile.parent.city" label="City" />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field color="accent" v-model="profile.parent.state" label="State" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field color="accent" v-model="profile.parent.zip" label="Zip" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                color="accent"
                v-model="profile.emergency_contact"
                label="Emergency Contact Name"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                color="accent"
                v-model="profile.emergency_contact_phone_number"
                label="Emergency Contact Phone Number"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent">
            <v-icon left dark>mdi-check</v-icon>Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  pageTitle: "Profile",
  data() {
    return {
      firstNameRules: [v => !!v || "First Name is required"],
      lastNameRules: [v => !!v || "Last Name is required"],
      profile: this.$store.getters.getProfile
    };
  }
};
</script>