<template>
    <DashboardWrap>
        <v-card class="fill-height">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            v-if="hasRegisteredCourses > 0"
                            cols="12"
                            class="courses courses-registered"
                        >
                            <strong class="title">Registered Courses</strong>
                            <p>Courses with registered students.</p>
                            <v-row v-if="!loadingRegisteredCoursesFetch">
                                <v-col
                                    v-for="item in registeredCourses"
                                    :key="item.id"
                                    cols="12"
                                >
                                    <RegisteredCard
                                        :course="item.course"
                                        :user="activeUser"
                                        :family="currentFamilyMembers"
                                        :registeredIds="[
                                            item.primary_family_member_id,
                                            item.secondary_family_member_id,
                                            item.tertiary_family_member_id,
                                        ]"
                                        :courseLink="`${item.id}`"
                                        :status="item.status"
                                        :totalDue="item.total_due / 100"
                                        :totalDueBy="item.total_due_by"
                                    />
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" class="courses courses-available">
                            <strong class="title">Courses Available</strong>
                            <p>View available courses and register students.</p>
                            <p v-if="hasCourses <= 0 && !loadingCoursesFetch">
                                No new courses are available at this time.
                            </p>
                            <v-row
                                v-else-if="
                                    hasCourses > 0 && !loadingCoursesFetch
                                "
                            >
                                <v-col
                                    v-for="course in availableCourses"
                                    :key="course.id"
                                    cols="12"
                                    md="6"
                                >
                                    <AvailableCard
                                        :course="course"
                                        :user="activeUser"
                                        :family="currentFamilyMembers"
                                        :hasFamilyMembers="hasFamilyMembers"
                                        :loadingFamily="
                                            loadingFamilyMemberFetch
                                        "
                                        :loadingRegistration="
                                            loadingRegisteredCoursesFetch
                                        "
                                        :cards="currentCards"
                                        :hasCards="hasCards"
                                        :cardFetching="loadingCardFetch"
                                    />
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
import { mapGetters } from 'vuex'
import DashboardWrap from '@/components/layouts/DashboardWrap'
import AvailableCard from '@/components/courses/AvailableCard.vue'
import RegisteredCard from '@/components/courses/RegisteredCard.vue'
import actionTypes from '@/store/actions'
const { courses, family, payments } = actionTypes
export default {
    name: 'Courses',
    metaInfo: {
        title: 'Register for available courses',
    },
    components: { DashboardWrap, AvailableCard, RegisteredCard },
    async created() {
        await this.$store.dispatch(family.request, this.activeUser.email)
        await this.$store.dispatch(courses.fetch, {
            user_email: this.activeUser.email,
            perspective: 'parent',
        })
        await this.$store.dispatch(payments.card.request, this.activeUser.email)
    },
    computed: {
        ...mapGetters([
            'hasCourses',
            'hasRegisteredCourses',
            'loadingCoursesFetch',
            'loadingRegisteredCoursesFetch',
            'availableCourses',
            'registeredCourses',
            'activeUser',
            'currentFamilyMembers',
            'hasFamilyMembers',
            'loadingFamilyMemberFetch',
            'hasCards',
            'currentCards',
            'loadingCardFetch',
        ]),
        computedDateFormatted() {
            return this.formatDateToLocal(this.date)
        },
    },
}
</script>

<style lang="scss" scoped>
.v-card.course-card {
    border-color: $brand-blue;
}
.course-card-footer {
    background: $white-smoke;
}
.status {
    width: 100%;
}
</style>
