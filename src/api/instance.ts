import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:1337/api/",
});

export default instance;
