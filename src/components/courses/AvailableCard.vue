<template>
    <v-card v-if="course" outlined class="course-card d-flex flex-column">
        <CourseFloats :code="course.code" :spots="fetchSpots" />
        <CourseTitle :course="course" />
        <CourseTimes :course="course" :timezone="user.timezone" />
        <CourseTeacher :course="course" />
        <v-spacer />
        <v-card-actions>
            <CourseRegister
                v-if="hasFamilyMembers > 0 && !loadingFamily"
                :course="course"
                :family="family"
                :hasFamilyMembers="hasFamilyMembers"
                :user="user"
                :cards="cards"
                :hasCards="hasCards"
                :cardFetching="cardFetching"
                :loadingRegistration="loadingRegistration"
            />
        </v-card-actions>
    </v-card>
</template>

<script>
import CourseRegister from '@/components/courses/card/CourseRegister'
import CourseTitle from '@/components/courses/card/CourseTitle'
import CourseFloats from '@/components/courses/card/CourseFloats'
import CourseTimes from '@/components/courses/card/CourseTimes'
import CourseTeacher from '@/components/courses/card/CourseTeacher'
export default {
    name: 'AvailableCard',
    components: {
        CourseTitle,
        CourseFloats,
        CourseTimes,
        CourseTeacher,
        CourseRegister,
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
        loadingFamily: {
            type: Boolean,
            default: true,
        },
        loadingRegistration: {
            type: Boolean,
            default: false,
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
    computed: {
        fetchSpots() {
            if (this.course?.capacity) {
                return {
                    max: this.course.capacity,
                    filled: this.course.capacity - this.course.available_spots,
                }
            }
            return null
        },
    },
}
</script>
<style lang="scss" scoped>
.course-card {
    height: 100%;
}
</style>
