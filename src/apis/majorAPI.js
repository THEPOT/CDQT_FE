import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Get all majors
export const getMajorsAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/majors`);
};

// Get major by id
export const getMajorByIdAPI = async (id) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/majors/${id}`);
};

// Create major
export const createMajorAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/majors`, data);
};

// Update major
export const updateMajorAPI = async (id, data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/majors/${id}`, data);
};

// Delete major
export const deleteMajorAPI = async (id) => {
  return await authorizedAxiosInstance.delete(`${BASE_URL}/majors/${id}`);
};