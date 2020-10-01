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
    detailLoading: true,
    detailError: false,
    detailSuccess: false,
    registerLoading: false,
    registerError: false,
    registerSuccess: false,
    uploadingMaterial: false
  },
  facultyCourses: {},
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
  hasFacultyCourses: state => {
    return Object.entries(state.facultyCourses).length;
  },
  availableCourses: state => state.available,
  registeredCourses: state => state.registered,
  facultyCourses: state => state.facultyCourses,
  loadingCoursesFetch: state => {
    return state.status.fetchLoading;
  },
  loadingRegisteredCoursesFetch: state => {
    return state.status.registerLoading;
  }
};

const actions = {
  [courses.fetch]: async (
    { commit, dispatch },
    { user_email, perspective }
  ) => {
    commit(courses.request, "fetch");
    try {
      const res = await CourseService.fetchAvailableCourses(
        user_email,
        perspective
      );
      commit(courses.success, { courses: res.courses, perspective });
      if (perspective === "parent") {
        const resReg = await CourseService.fetchRegisteredCourses(user_email);
        commit(courses.registerList, resReg.registrations);
      }
    } catch (err) {
      if (err.hasRefreshedToken) dispatch(courses.request, user_email);
      commit(courses.error, err);
    }
  },
  [courses.sessions.parent]: async ({ commit, getters, dispatch }, id) => {
    commit(courses.request, "sessions");
    const currentUser = getters?.activeUser;
    const email = currentUser.email;
    if (getters.hasRegisteredCourses <= 0) {
      await dispatch(courses.fetch, {
        user_email: email,
        perspective: "parent"
      });
    }

    try {
      const res = await CourseService.fetchRegisteredCourseSessions(id);
      commit(courses.sessions.parent, { res: res.class_sessions, id });
    } catch (err) {
      if (err.hasRefreshedToken) dispatch(courses.request, email);
      commit(courses.error, err);
    }
  },
  [courses.sessions.faculty]: async ({ commit, getters, dispatch }, id) => {
    commit(courses.request, "sessions");
    const currentUser = getters?.activeUser;
    const email = currentUser.email;
    if (getters.hasRegisteredCourses <= 0) {
      await dispatch(courses.fetch, {
        user_email: email,
        perspective: "faculty"
      });
    }

    try {
      const res = await CourseService.fetchFacultyCourseSessions(id);
      commit(courses.sessions.faculty, { res: res.teaching_sessions, id });
    } catch (err) {
      if (err.hasRefreshedToken) dispatch(courses.request, email);
      commit(courses.error, err);
    }
  },
  [courses.sessions.upload]: async ({ commit }, { id, file }) => {
    commit(courses.request, "upload");
    console.log({ id, file });
    try {
      const res = await CourseService.uploadSessionMaterial(id, file);
      console.log("result -- ", res);
      /*
      const some = {
        teaching_session_student_upload: {
          id: 1,
          teaching_session_id: 124,
          name: "4eeb9b2bb0c9e69d0fe4fb12b436bbe5a0440cb7.png",
          mime_type: "image/png",
          created_at: "2020-09-27T19:02:32.467Z",
          updated_at: "2020-09-27T19:02:32.467Z"
        }
      };
      */
    } catch (err) {
      console.error(err);
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
      case "sessions":
        state.status.detailLoading = true;
        break;
      case "register":
        state.status.registerLoading = true;
        break;
      case "upload":
        state.status.uploadingMaterial = true;
        break;
      default:
        state.status = { ...state.status };
    }
  },
  [courses.success]: (state, { courses, perspective }) => {
    state.status.fetchLoading = false;
    state.status.fetchSuccess = true;
    console.log("res 2:", courses);
    console.log("per 2: ", perspective);
    if (perspective === "parent") {
      Vue.set(state, "available", _.mapKeys(courses, "id"));
    } else {
      console.log("correct");
      Vue.set(state, "facultyCourses", _.mapKeys(courses, "id"));
    }
  },
  [courses.registerList]: (state, res) => {
    state.status.registerLoading = false;
    state.status.registerSuccess = true;
    Vue.set(state, "registered", _.mapKeys(res, "id"));
  },
  [courses.sessions.parent]: (state, { res, id }) => {
    state.status.detailLoading = false;
    state.status.detailSuccess = true;
    Vue.set(state.registered[id].course, "sessions", _.mapKeys(res, "id"));
  },
  [courses.sessions.faculty]: (state, { res, id }) => {
    state.status.detailLoading = false;
    state.status.detailSuccess = true;
    Vue.set(state.facultyCourses[id], "sessions", _.mapKeys(res, "id"));
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
    console.error(err);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
