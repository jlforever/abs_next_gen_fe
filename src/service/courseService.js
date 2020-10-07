import absAPI from "@/api/absAPI";
import authHeader from "./authHeader";

class CourseService {
  async fetchAvailableCourses(email, perspective) {
    const res = await absAPI.get("/courses", {
      params: { user_email: email, perspective: perspective },
      headers: authHeader()
    });
    return res.data;
  }
  async registerCourse(params) {
    const res = await absAPI.post("/registrations", params, {
      headers: authHeader()
    });
    return res.data;
  }
  async fetchRegisteredCourses(email) {
    const res = await absAPI.get("/registrations", {
      params: { user_email: email },
      headers: authHeader()
    });
    return res.data;
  }
  async fetchRegisteredCourseSessions(id) {
    const res = await absAPI.get(`/registrations/${id}/class_sessions`, {
      params: { id: id },
      headers: authHeader()
    });
    return res.data;
  }
  async fetchFacultyCourseSessions(id) {
    const res = await absAPI.get(`/courses/${id}/teaching_sessions`, {
      params: { id: id },
      headers: authHeader()
    });
    return res.data;
  }
  async uploadSessionMaterial(id, file) {
    const res = await absAPI.post(
      `/teaching_sessions/${id}/student_materials`,
      file,
      {
        headers: {
          ...authHeader(),
          "Content-Type": `multipart/form-data; boundary=${file._boundary}`
        }
      }
    );
    return res.data;
  }
  async deleteSessionMaterial(materialId, sessionId) {
    const res = await absAPI.delete(
      `/teaching_sessions/${sessionId}/student_materials/${materialId}`,
      {
        headers: authHeader()
      }
    );

    return res.data;
  }
}

export default new CourseService();
