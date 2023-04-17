import axios from "axios";
import { sleep } from "../helpers/utils";

axios.defaults.baseURL = "./mock/";
axios.interceptors.response.use(async (response) => {
  await sleep();
  return response.data;
});

export default axios;
