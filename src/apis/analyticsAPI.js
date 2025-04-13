import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Get analytics summary for a specific term
export const getTermAnalyticsSummaryAPI = async (termId) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/RegistrationPeriods/analytics`, {
      params: { termId }
    }
  );
};

// Get term summaries
export const getTermSummariesAPI = async () => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/RegistrationPeriods/terms/summaries`
  );
};

// Get course registration statistics
export const getCourseRegistrationStatsAPI = async (termId) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/RegistrationPeriods/courses/summaries`, {
      params: { termId }
    }
  );
};

// Get program-wise registration statistics
export const getProgramRegistrationStatsAPI = async (termId) => {
  return await authorizedAxiosInstance.get(
    `${BASE_URL}/RegistrationPeriods/programs/summaries`, {
      params: { termId }
    }
  );
};
