import absAPI from "@/api/absAPI";
import authHeader from "./authHeader";

class UserService {
  async fetchCourses(email) {
    const res = await absAPI.get("/courses", {
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
