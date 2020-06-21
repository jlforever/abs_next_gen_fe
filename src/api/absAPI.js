import axios from "axios";

const absAPI = axios.create({
  baseURL: process.env.VUE_APP_ABS_API
});

export default absAPI;
