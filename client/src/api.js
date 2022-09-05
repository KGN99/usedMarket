import Axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { API_HOST } from "utils/Constants";

// axios baseURL추가해서 편리하게 사용
export const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

export const useAxios = makeUseAxios({
  axios: axiosInstance,
});
