<template>
    <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn v-on="on" block color="primary" dark>
                <v-icon>mdi-clipboard-text</v-icon>
                <span>Register</span>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="headline">Register</v-card-title>
            <v-card-text>
                <div class="mb-2">
                    Which family members would you like to register for this
                    class?
                </div>
                <div class="mt-2">
                    <v-chip
                        v-for="item in family"
                        :key="item.id"
                        :class="`mr-1 mb-1${
                            isSelected(item.id) ? ' active' : ''
                        }`"
                        @click="selectFamilyMember(item.id)"
                        >{{ item.student.first_name }}</v-chip
                    >
                </div>
                <div v-if="hasFamilyMembers > 3" class="mt-2">
                    Choose up to 3 family members to register.
                </div>
                <v-card class="payment my-3" outlined color="grey lighten-3">
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="d-flex mb-3">
                                <div>Payment</div>
                                <v-spacer />
                                <div v-if="currentPayment > 0">
                                    {{ (currentPayment / 100) | currency }}
                                </div>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <CoursePaymentStripe
                                    v-if="!cardFetching && !hasCards"
                                    ref="coursePaymentStripe"
                                    @chargeCreated="stripeCharged"
                                    :currentPayment="currentPayment"
                                    :cards="cards"
                                />
                                <v-radio-group
                                    v-else-if="!cardFetching && hasCards"
                                    v-model="
                                        cards[Object.keys(cards)[0]]
                                            .card_last_four
                                    "
                                >
                                    <v-radio
                                        v-for="card in cards"
                                        :key="`cc-${card.id}`"
                                        :label="`${card.card_type} ending in ${card.card_last_four}`"
                                        :value="card.card_last_four"
                                    />
                                </v-radio-group>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
                <v-checkbox v-model="checkbox">
                    <template v-slot:label>
                        <div>
                            Do you agree to the
                            <a
                                @click.stop
                                href="https://aba-general.s3.amazonaws.com/ABA+Photo_Video+Release+Form.pdf"
                                target="_blank"
                                >Photo/Video Release</a
                            >?
                        </div>
                    </template>
                </v-checkbox>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="closeDialog()"
                    >Cancel</v-btn
                >
                <v-btn color="secondary" @click="beginRegistration()"
                    >Submit</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import CoursePaymentStripe from '../payment/CoursePaymentStripe'
import CourseService from '@/service/courseService'
import actionTypes from '@/store/actions'
const { courses: courseAction, payments: paymentAction } = actionTypes
export default {
    components: { CoursePaymentStripe },
    data() {
        return {
            dialog: false,
            checkbox: false,
            currentPayment: 0,
            familyMemberIds: [],
        }
    },
    props: {
        course: {
            type: Object,
            default: null,
        },
        user: {
            type: Object,
            default: null,
        },
        family: {
            type: Object,
            default: null,
        },
        hasFamilyMembers: {
            type: Number,
            default: 0,
        },
        cards: {
            type: Object,
            default: null,
        },
        hasCards: {
            type: Boolean,
            default: false,
        },
        cardFetching: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeDialog() {
            this.dialog = false
            this.currentPayment = 0
            this.familyMemberIds = []
        },
        isSelected(id) {
            return this.familyMemberIds.includes(id)
        },
        async selectFamilyMember(id) {
            const { user, course } = this.$props
            if (this.familyMemberIds.includes(id)) {
                this.familyMemberIds = this.familyMemberIds.filter(function (
                    v
                ) {
                    return v !== id
                })
            } else if (this.familyMemberIds.length <= 2) {
                this.familyMemberIds.push(id)
            }
            if (
                this.familyMemberIds.length > 0 &&
                this.familyMemberIds.length <= 2
            ) {
                const courseParams = {
                    user_email: user.email,
                    charge_amount_request: {
                        course_id: course.id,
                    },
                }
                if (this.familyMemberIds[0]) {
                    courseParams.charge_amount_request.primary_family_member_id = this.familyMemberIds[0]
                }
                if (this.familyMemberIds[1]) {
                    courseParams.charge_amount_request.secondary_family_member_id = this.familyMemberIds[1]
                }
                if (this.familyMemberIds[2]) {
                    courseParams.charge_amount_request.tertiary_family_member_id = this.familyMemberIds[2]
                }
                const res = await CourseService.fetchCoursePayment(courseParams)
                this.currentPayment = res.amount
            } else if (this.familyMemberIds.length === 0) {
                this.currentPayment = 0
            }
        },
        beginRegistration() {
            // grab submit method from CoursePaymentStripe component from ref added to template
            if (this.$props.hasCards) {
                this.registerCourse()
            } else {
                this.$refs.coursePaymentStripe.submit()
            }
        },
        async stripeCharged(stripeObj) {
            const { user } = this.$props
            const ccCreateParams = {
                card_holder_name: `${user.first_name} ${user.last_name}`,
                card_last_four: stripeObj.card.last4,
                card_type: stripeObj.card.brand,
                card_expire_month: stripeObj.card.exp_month,
                card_expire_year: stripeObj.card.exp_year,
                postal_identification: stripeObj.card.address_zip,
                stripe_card_token: stripeObj.id,
            }

            await this.$store.dispatch(paymentAction.card.create, {
                user_email: user.email,
                credit_card: ccCreateParams,
            })

            this.registerCourse()
        },
        async registerCourse() {
            const { course, user, cards, hasCards } = this.$props
            const registerParams = {
                course_id: course.id,
                accept_release_form: this.checkbox,
            }
            if (hasCards) {
                console.log('yes?')
                registerParams.credit_card_id = cards[Object.keys(cards)[0]].id
                registerParams.charge_amount = this.currentPayment
            }
            if (this.familyMemberIds[0]) {
                registerParams.primary_family_member_id = this.familyMemberIds[0]
            }
            if (this.familyMemberIds[1]) {
                registerParams.secondary_family_member_id = this.familyMemberIds[1]
            }
            if (this.familyMemberIds[2]) {
                registerParams.tertiary_family_member_id = this.familyMemberIds[2]
            }
            this.$store
                .dispatch(courseAction.register, {
                    user_email: user.email,
                    registration: registerParams,
                })
                .then(() => {
                    this.dialog = false
                })
        },
    },
}
</script>
<style lang="scss" scoped>
.v-chip.active {
    background: $brand-pink;
    color: #fff;
}
.payment-card .v-list-item__subtitle {
    white-space: normal;
}
</style>
