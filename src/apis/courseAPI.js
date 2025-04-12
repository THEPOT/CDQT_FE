import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getCourseAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseRegistrations/available-courses`);
};

export const getCourseStaffAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Course`);
};