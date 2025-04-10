import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getProfileAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/me/detailed`);
};  