import Vue from "vue";
import _ from "lodash";
import actionTypes from "@/store/actions";
import CourseService from "@/service/courseService";

const { courses } = actionTypes;

const state = {
  status: {
    fetchLoading: true,
    fetchError: false,
    fetchSuccess: false,
    createLoading: false,
    createError: false,
    createSuccess: false,
    deleteLoading: false,
    deleteError: false,
    deleteSuccess: true
  },
  available: {}
};

const getters = {
  hasCourses: state => {
    return Object.entries(state.available).length;
  },
  availableCourses: state => state.available,
  loadingCoursesFetch: state => {
    return state.status.fetchLoading;
  }
};

const actions = {
  [courses.request]: async ({ commit }, email) => {
    commit(courses.request, "fetch");
    try {
      const res = await CourseService.fetchCourses(email);
      commit(courses.success, res.courses);
    } catch (err) {
      commit(courses.error);
    }
  },
  [courses.register]: async ({ commit }, params) => {
    commit(courses.request, "create");
    try {
      const res = await CourseService.registerCourse(params);
      console.log(res);
      commit(courses.register, res.course);
    } catch (err) {
      commit(courses.error, err);
    }
  }
};

const mutations = {
  [courses.request]: (state, type) => {
    switch (type) {
      case "fetch":
        state.status.fetchLoading = true;
        break;
      case "create":
        state.status.createLoading = true;
        break;
      case "delete":
        state.status.deleteLoading = true;
        break;
      default:
        state.status = { ...state.status };
    }
  },
  [courses.success]: (state, res) => {
    state.status.fetchLoading = false;
    state.status.fetchSuccess = true;
    Vue.set(state, "available", _.mapKeys(res, "id"));
  },
  [courses.create]: (state, course) => {
    state.status.createLoading = false;
    state.status.createSuccess = true;
    Vue.set(state, "available", { ...state.available, [course.id]: course });
  },
  [courses.delete]: (state, course) => {
    state.status.deleteLoading = false;
    state.status.deleteSuccess = true;
    Vue.delete(state.available, course.id);
  },
  [courses.error]: (state, err) => {
    state.status.errorLoading = false;
    state.status.errorSuccess = true;
    console.log(err);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
