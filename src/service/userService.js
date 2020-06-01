import absAPI from "@/api/absAPI";
import authHeader from "./authHeader";

class UserService {
  async fetchProfile(email) {
    const storedUser = JSON.parse(localStorage.getItem("authData"));
    const res = await absAPI.get("user_profiles", {
      params: { email: storedUser.email || email },
      headers: authHeader()
    });
    return res.data;
  }
  async updateProfile(user) {
    const res = await absAPI.post("user_profile_changes", user, {
      headers: authHeader()
    });
    return res.data;
  }
}

export default new UserService();
