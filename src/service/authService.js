import absAPI from "@/api/absAPI";
import authHeader from "./authHeader";

function storeUser(token, email) {
  const data = { token: token, email: email };
  return JSON.stringify(data);
}

class AuthService {
  async connect(url, params) {
    const res = await absAPI.post(url, params);
    localStorage.setItem(
      "authData",
      storeUser(res.data.access, params.user.email)
    );
    return res.data;
  }
  async retry(email) {
    const res = await absAPI.post("/authentication_renewals", null, {
      headers: authHeader()
    });
    localStorage.setItem("authData", storeUser(res.data.access, email));
    return res.data;
  }
  logout() {
    localStorage.removeItem("authData");
  }

  // reset password
  async passwordResetRequest(params) {
    const res = await absAPI.post("/password_reset_requests", params);
    return res;
  }
  async passwordResetVerify(resetToken) {
    const res = await absAPI.get(`/password_resets/${resetToken}/edit`);
    return res;
  }
  async passwordResetSubmit(resetToken, params) {
    const res = await absAPI.put(`/password_resets/${resetToken}`, params);
    return res;
  }
}

export default new AuthService();
