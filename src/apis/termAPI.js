import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// A. Semester Management
export const createSemesterAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Semesters`, data);
};

export const getSemestersAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Semesters`);
};

// B. Registration Period Management
export const createRegistrationPeriodAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/registration-periods`, data);
};

export const updateRegistrationStatusAPI = async (periodId, status) => {
  return await authorizedAxiosInstance.put(
    `${BASE_URL}/registration-periods/${periodId}/status`,
    { status }
  );
};

// C. Course & Schedule Management
export const createCourseOfferingsAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/course-offerings`, data);
};

// D. Registration Statistics
export const getTermSummaryAPI = async (termId) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/registration-periods/terms/${termId}/summary`
  );
};

export const getRegistrationStatisticsAPI = async (periodId, params) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/registration-periods/${periodId}/statistics`,
    { params }
  );
};

export const getProgramStatisticsAPI = async (periodId) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/registration-periods/${periodId}/programs/statistics`
  );
};

export const getCourseStudentsAPI = async (courseOfferingId) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/courses/${courseOfferingId}/students`
  );
};