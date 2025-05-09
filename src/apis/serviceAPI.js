import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Get all service requests
export const getServiceRequestsAPI = async (params) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/ServiceRequests`, { params });
};

// Get service request by id
export const getServiceRequestByIdAPI = async (id) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/ServiceRequests/${id}`);
};

// Create service request
export const createServiceRequestAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/ServiceRequests`, data);
};

// Update service request status
export const updateServiceRequestStatusAPI = async (id, status) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/ServiceRequests/${id}/status`, { status });
};

// Get service request statistics
export const getServiceStatisticsAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/ServiceRequests/statistics`);
};

// Export service requests report
export const exportServiceReportAPI = async (params) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/ServiceRequests/export`, {
    params,
    responseType: 'blob'
  });
};