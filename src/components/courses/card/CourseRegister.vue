<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" block color="primary" dark>
        <v-icon>mdi-clipboard-text</v-icon>
        <span>Register</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Register</v-card-title>
      <v-card-text>
        <div class="mb-2">Which family members would you like to register for this class?</div>
        <div class="mt-2">
          <v-chip
            v-for="item in family"
            :key="item.id"
            :class="`mr-1 mb-1${isSelected(item.id) ? ' active' : ''}`"
            @click="selectFamilyMember(item.id)"
          >{{item.student.first_name}}</v-chip>
        </div>
        <div v-if="hasFamilyMembers > 3" class="mt-2">Choose up to 3 family members to register.</div>
        <v-checkbox v-model="checkbox">
          <template v-slot:label>
            Do you agree to the
            <a
              @click.stop
              href="https://aba-general.s3.amazonaws.com/ABA+Photo_Video+Release+Form.pdf"
              target="_blank"
            >Photo/Video Release</a>?
          </template>
        </v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="secondary" @click="registerCourse()">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import actionTypes from "@/store/actions";
const { courses: courseAction } = actionTypes;
export default {
  data() {
    return {
      dialog: false,
      checkbox: false,
      familyMemberIds: []
    };
  },
  props: {
    course: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    family: {
      type: Object,
      default: null
    },
    hasFamilyMembers: {
      type: Number,
      default: 0
    }
  },
  methods: {
    isSelected(id) {
      return this.familyMemberIds.includes(id);
    },
    selectFamilyMember(id) {
      if (this.familyMemberIds.includes(id)) {
        this.familyMemberIds = this.familyMemberIds.filter(function(v) {
          return v !== id;
        });
      } else if (this.familyMemberIds.length <= 2) {
        this.familyMemberIds.push(id);
      }
    },
    registerCourse() {
      const { course, user } = this.$props;
      const registerParams = {
        course_id: course.id,
        accept_release_form: this.checkbox
      };
      if (this.familyMemberIds[0]) {
        registerParams.primary_family_member_id = this.familyMemberIds[0];
      }
      if (this.familyMemberIds[1]) {
        registerParams.secondary_family_member_id = this.familyMemberIds[1];
      }
      if (this.familyMemberIds[2]) {
        registerParams.tertiary_family_member_id = this.familyMemberIds[2];
      }
      this.$store
        .dispatch(courseAction.register, {
          user_email: user.email,
          registration: registerParams
        })
        .then(() => {
          this.dialog = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.v-chip.active {
  background: $brand-pink;
  color: #fff;
}
.v-input--checkbox::v-deep .v-label {
  display: block;
}
</style>
