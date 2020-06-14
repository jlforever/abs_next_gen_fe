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
  async createCourse(course) {
    console.log("create: ", course);
  }
  async deleteCourse(userId, params) {
    console.log("del :", { userId, params });
  }
}

export default new UserService();
