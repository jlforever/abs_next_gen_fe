<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" dark color="secondary">
          <v-icon>mdi-plus</v-icon>Add student
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add a Student</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="family.first_name"
                  label="First Name"
                  color="secondary"
                  required
                  :rules="firstNameRules"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="family.last_name"
                  label="Last Name"
                  color="secondary"
                  required
                  :rules="lastNameRules"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="family.nickname"
                  label="Nickname"
                  color="secondary"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-menu
                  ref="dateSelect"
                  v-model="dateSelect"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dateFormatted"
                      label="Date of Birth"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      @blur="family.date_of_birth = parseDate(dateFormatted)"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="family.date_of_birth"
                    no-title
                    @input="dateSelect = false"
                  />
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="handleSubmit()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import actionTypes from "@/store/actions";
const { family } = actionTypes;
export default {
  name: "FamilyMemberForm",
  data: vm => ({
    dialog: false,
    dateSelect: false,
    family: {
      first_name: "",
      last_name: "",
      nickname: "",
      date_of_birth: new Date().toISOString().substr(0, 10)
    },
    firstNameRules: [v => !!v || "First Name is required"],
    lastNameRules: [v => !!v || "Last Name is required"],
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10))
  }),
  computed: {
    date() {
      return this.family.date_of_birth;
    }
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.family.date_of_birth);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    handleSubmit() {
      this.$store.dispatch(family.create, { student: this.family }).then(() => {
        this.dialog = false;
      });
    }
  }
};
</script>
