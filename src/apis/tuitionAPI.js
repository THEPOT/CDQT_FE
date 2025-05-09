import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Get tuition rates
export const getTuitionRatesAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Tuitions/rates`);
};

// Update tuition rates
export const updateTuitionRatesAPI = async (data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/Tuitions/rates`, data);
};

// Get program rates
export const getProgramRatesAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Tuitions/program-rates`);
};

// Update program rates
export const updateProgramRatesAPI = async (data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/Tuitions/program-rates`, data);
};

// Get tuition payments
export const getTuitionPaymentsAPI = async (params) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Tuitions/payments`, { params });
};

// Get tuition statistics
export const getTuitionStatisticsAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Tuitions/statistics`);
};

// Create tuition period
export const createTuitionPeriodAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Tuitions/period`, data);
};

// Update period status
export const updatePeriodStatusAPI = async (periodId, status) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/Tuitions/period/${periodId}/status`, { status });
};

// Record payment
export const recordPaymentAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Tuitions/payment`, data);
};

// Get student status
export const getStudentStatusAPI = async (params) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Tuitions/status`, { params });
};

// Get term summary
export const getTermSummaryAPI = async (termId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Tuitions/summary?termId=${termId}`);
};