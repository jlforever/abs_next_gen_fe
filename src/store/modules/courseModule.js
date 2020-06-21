import Vue from "vue";
import _ from "lodash";
import actionTypes from "@/store/actions";
import CourseService from "@/service/courseService";

const { courses, errors } = actionTypes;

const state = {
  status: {
    fetchLoading: true,
    fetchError: false,
    fetchSuccess: false,
    registerLoading: false,
    registerError: false,
    registerSuccess: false
  },
  available: {},
  registered: {}
};

const getters = {
  hasCourses: state => {
    return Object.entries(state.available).length;
  },
  hasRegisteredCourses: state => {
    return Object.entries(state.registered).length;
  },
  availableCourses: state => state.available,
  registeredCourses: state => state.registered,
  loadingCoursesFetch: state => {
    return state.status.fetchLoading;
  },
  loadingRegisteredCoursesFetch: state => {
    return state.status.registerLoading;
  }
};

const actions = {
  [courses.request]: async ({ commit, dispatch }, email) => {
    commit(courses.request, "fetch");
    try {
      const res = await CourseService.fetchAvailableCourses(email);
      commit(courses.success, res.courses);
      const resReg = await CourseService.fetchRegisteredCourses(email);
      commit(courses.registerList, resReg.registrations);
    } catch (err) {
      if (err.hasRefreshedToken) dispatch(courses.request, email);
      commit(courses.error, err);
    }
  },
  [courses.register]: async ({ commit, dispatch }, params) => {
    commit(courses.request, "register");
    try {
      const res = await CourseService.registerCourse(params);
      commit(courses.register, res.registration);
    } catch (err) {
      commit(courses.error, err);
      dispatch(errors.format, err);
    }
  }
};

const mutations = {
  [courses.request]: (state, type) => {
    switch (type) {
      case "fetch":
        state.status.fetchLoading = true;
        break;
      case "register":
        state.status.registerLoading = true;
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
  [courses.registerList]: (state, res) => {
    state.status.registerLoading = false;
    state.status.registerSuccess = true;
    Vue.set(state, "registered", _.mapKeys(res, "id"));
  },
  [courses.register]: (state, res) => {
    state.status.registerLoading = false;
    state.status.registerSuccess = true;
    state.registered = Object.assign({}, state.registered, {
      [res.id]: res
    });
    Vue.delete(state.available, res.course.id);
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
