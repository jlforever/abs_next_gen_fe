import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_ABS_API
});
