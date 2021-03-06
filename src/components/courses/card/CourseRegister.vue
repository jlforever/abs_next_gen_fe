<template>
    <v-dialog v-model="dialog" persistent max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn
                v-on="on"
                block
                color="primary"
                dark
                :disabled="course.available_spots === 0"
            >
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
                                <div v-if="Object.keys(currentPayment).length">
                                    {{
                                        (currentPayment.total / 100) | currency
                                    }}
                                </div>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <div v-if="Object.keys(currentPayment).length">
                                    <CoursePaymentStripe
                                        v-if="
                                            !cardFetching &&
                                            !hasCards &&
                                            !payLater
                                        "
                                        ref="coursePaymentStripe"
                                        @chargeCreated="stripeCharged"
                                        :currentPayment="currentPayment"
                                        :cards="cards"
                                    />
                                    <v-radio-group
                                        v-else-if="
                                            !cardFetching &&
                                            hasCards &&
                                            !payLater
                                        "
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
                                    <v-list
                                        dense
                                        disabled
                                        class="course-pricing"
                                    >
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-subtitle
                                                    >Subtotal</v-list-item-subtitle
                                                >
                                                <v-list-item-title
                                                    class="text-right"
                                                    >{{
                                                        (currentPayment.subtotal /
                                                            100)
                                                            | currency
                                                    }}</v-list-item-title
                                                >
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-subtitle
                                                    >Handling
                                                    Fee</v-list-item-subtitle
                                                >
                                                <v-list-item-title
                                                    class="text-right"
                                                    >{{
                                                        (currentPayment.fee /
                                                            100)
                                                            | currency
                                                    }}</v-list-item-title
                                                >
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-subtitle
                                                    >Total</v-list-item-subtitle
                                                >
                                                <v-list-item-title
                                                    class="text-right"
                                                    >{{
                                                        (currentPayment.total /
                                                            100)
                                                            | currency
                                                    }}</v-list-item-title
                                                >
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <div class="caption">
                                        <a
                                            href="https://aba-general.s3.amazonaws.com/aba_terms_of_use.pdf"
                                            target="_blank"
                                            >Terms of use</a
                                        >
                                    </div>
                                </div>
                                <p
                                    v-else-if="
                                        Object.keys(currentPayment).length === 0
                                    "
                                >
                                    Students must be selected before setting up
                                    payment information.
                                </p>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
                <div class="checkboxes">
                    <v-checkbox v-model="acceptReleaseForm">
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
                    <v-checkbox v-model="payLater" label="Pay later?" />
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="closeDialog()"
                    >Cancel</v-btn
                >
                <v-btn
                    color="secondary"
                    @click="beginRegistration()"
                    :disabled="
                        familyMemberIds.length <= 0 ||
                        loadingRegistration ||
                        cardFetching
                    "
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
            acceptReleaseForm: true,
            payLater: false,
            currentPayment: {},
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
        loadingRegistration: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        closeDialog() {
            this.dialog = false
            this.currentPayment = {}
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
                this.currentPayment = {
                    subtotal: res.amount_specification.course_subtotal,
                    fee: res.amount_specification.handling_fee,
                    total: res.amount_specification.total,
                }
            } else if (this.familyMemberIds.length === 0) {
                this.currentPayment = {}
            }
        },
        beginRegistration() {
            // grab submit method from CoursePaymentStripe component from ref added to template
            if (this.$props.hasCards || this.payLater) {
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
                accept_release_form: this.acceptReleaseForm,
            }
            if (hasCards && !this.payLater) {
                registerParams.credit_card_id = cards[Object.keys(cards)[0]].id
                registerParams.charge_amount = this.currentPayment.total
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
.payment .v-list-item__subtitle {
    white-space: normal;
}

.v-input--radio-group {
    margin-top: 0;
}
.checkboxes::v-deep {
    .v-input--selection-controls.v-input--checkbox {
        margin-top: 0;
        .v-input__slot {
            margin-bottom: 0;
        }
        .v-messages {
            display: none;
        }
    }
}
.course-pricing {
    background-color: transparent;
    text-align: right;
    .v-list-item__title {
        flex: 1 1 40%;
    }
    .v-list-item__subtitle {
        flex: 1 0 60%;
    }
    &.v-list--dense .v-list-item {
        min-height: 30px;
    }
    .v-list-item__content {
        padding: 0 0 4px;
    }
}
</style>
