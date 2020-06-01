import absAPI from "@/api/absAPI";
import authHeader from "./authHeader";

class UserService {
  async fetchMembers(email) {
    const res = await absAPI.get("family_members", {
      params: { user_email: email },
      headers: authHeader()
    });
    return res.data;
  }
  async createMember(student) {
    const res = await absAPI.post("family_members", student, {
      headers: authHeader()
    });
    return res.data;
  }
}

export default new UserService();
