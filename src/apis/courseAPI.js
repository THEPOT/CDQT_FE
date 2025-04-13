import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getCourseAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseRegistrations/available-courses`);
};

export const registerCourseAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/CourseRegistrations/register`, data);
};

export const getCourseStaffAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Course`);
};

export const getDepartmentsAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Departments`);
};

export const createCourseAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Course`, data);
};

export const updateCourseAPI = async (courseId, data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/Course/${courseId}`, data);
};

export const deleteCourseAPI = async (courseId) => {
  return await authorizedAxiosInstance.delete(`${BASE_URL}/Course/${courseId}`);
};

