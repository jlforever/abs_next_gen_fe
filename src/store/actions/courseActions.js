export default {
  request: "COURSE_REQUEST",
  fetch: "COURSE_FETCH",
  create: "COURSE_CREATE",
  delete: "COURSE_DELETE",
  error: "COURSE_ERROR",
  success: "COURSE_SUCCESS",
  register: "COURSE_REGISTER",
  registerList: "COURSE_REGISTER_LIST",
  sessions: {
    parent: "COURSE_SESSION_PARENT",
    faculty: "COURSE_SESSION_FACULTY",
    materials: {
      upload: "COURSE_SESSION_UPLOAD_MATERIAL",
      create: "COURSE_SESSION_NEW_MATERIAL",
      delete: "COURSE_SESSION_DELETE_MATERIAL"
    }
  }
};
