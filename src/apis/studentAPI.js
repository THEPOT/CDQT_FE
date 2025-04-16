import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getStudentAPI = async (page = 1 , size = 10, search = "") => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students?page=${page}&size=${size}&search=${search}`);
};