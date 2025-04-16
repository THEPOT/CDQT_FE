import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getTranscriptAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/detailed-transcript`);
};