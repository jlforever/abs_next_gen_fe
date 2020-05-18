import absAPI from "@/api/absAPI";

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
  logout() {
    localStorage.removeItem("authData");
  }
}

export default new AuthService();
