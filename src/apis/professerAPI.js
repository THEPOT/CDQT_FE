import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getProfesserAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Professors`);
};