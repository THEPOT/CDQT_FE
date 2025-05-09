import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getScholarshipsAPI = async (page = 1, size = 10) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Scholarships?page=${page}&size=${size}`);
};

export const createScholarshipAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Scholarships`, data);
};

export const updateScholarshipAPI = async (id, data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/Scholarships/${id}`, data);
};

export const deleteScholarshipAPI = async (id) => {
  return await authorizedAxiosInstance.delete(`${BASE_URL}/Scholarships/${id}`);
};

export const getScholarshipRecipientsAPI = async (scholarshipId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Scholarships/${scholarshipId}/recipients`);
};

export const reviewScholarshipsAPI = async (termId) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Scholarships/review/${termId}`);
};