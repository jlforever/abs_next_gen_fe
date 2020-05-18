export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("authData"));

  if (user?.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
