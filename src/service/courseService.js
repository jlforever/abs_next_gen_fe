import absAPI from "@/api/absAPI";
import authHeader from "./authHeader";

class UserService {
  async fetchAvailableCourses(email) {
    const res = await absAPI.get("/courses", {
      params: { user_email: email },
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
  async registerCourse(params) {
    const res = await absAPI.post("/registrations", params, {
      headers: authHeader()
    });
    return res.data;
  }
}

export default new UserService();
