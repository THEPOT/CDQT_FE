import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getDepartmentAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Departments`);
};

export const createDepartmentAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Departments`, data);
};

export const updateDepartmentAPI = async (departmentId, data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/Departments/${departmentId}`, data);
};

export const deleteDepartmentAPI = async (departmentId) => {
  return await authorizedAxiosInstance.delete(`${BASE_URL}/Departments/${departmentId}`);
};