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
    uploadingMaterial: false,
    deletingMaterial: false
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
  },
  uploadingMaterials: state => {
    return state.status.uploadingMaterial;
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
  [courses.sessions.materials.upload]: async (
    { commit },
    { sessionId, courseId, file }
  ) => {
    commit(courses.request, "upload");
    try {
      const res = await CourseService.uploadSessionMaterial(sessionId, file);
      commit(courses.sessions.materials.create, {
        upload: res,
        sessionId,
        courseId
      });
    } catch (err) {
      console.error(err);
    }
  },
  [courses.sessions.materials.delete]: async (
    { commit, dispatch },
    { materialId, sessionId, courseId }
  ) => {
    commit(courses.request, "delete");
    try {
      const res = await CourseService.deleteSessionMaterial(
        materialId,
        sessionId
      );
      commit(courses.sessions.materials.delete, {
        material: res.teaching_session_student_upload,
        courseId,
        sessionId
      });
    } catch (err) {
      dispatch(errors.format, err);
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
      case "delete":
        state.status.deletingMaterial = true;
        break;
      default:
        state.status = { ...state.status };
    }
  },
  [courses.success]: (state, { courses, perspective }) => {
    state.status.fetchLoading = false;
    state.status.fetchSuccess = true;

    if (perspective === "parent") {
      Vue.set(state, "available", _.mapKeys(courses, "id"));
    } else {
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
  [courses.sessions.materials.create]: (
    state,
    { upload, courseId, sessionId }
  ) => {
    const currentSession = state.facultyCourses[courseId]?.sessions[sessionId];
    const newFile = upload.teaching_session_student_upload;
    const filterCheck = currentSession.teaching_session_student_uploads.filter(
      file => file.id === newFile.id
    );

    state.status.uploadingMaterial = false;
    if (filterCheck.length === 0) {
      state.facultyCourses[courseId].sessions[
        sessionId
      ].teaching_session_student_uploads.push(newFile);
    }
  },
  [courses.sessions.materials.delete]: (
    state,
    { material, sessionId, courseId }
  ) => {
    state.facultyCourses[courseId].sessions[
      sessionId
    ].teaching_session_student_uploads = state.facultyCourses[
      courseId
    ].sessions[sessionId].teaching_session_student_uploads.filter(
      item => item.id !== material.id
    );
    state.status.deletingMaterial = false;
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
