import authorizedAxiosInstance from "@/utils/authorizedAxios";

import { BASE_URL } from "@/configs/globalVariables";

// Get current evaluation period
export const getCurrentEvaluationPeriod = async () => {
  try {
    const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/period/current`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update evaluation period
export const updateEvaluationPeriod = async (periodData) => {
  try {
    const response = await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations/period`, periodData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get evaluation status for student
export const getEvaluationStatus = async (semesterId) => {
  try {
    const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/status/${semesterId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Submit course evaluation
export const submitEvaluation = async (evaluationData) => {
  try {
    const response = await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations`, evaluationData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get professor evaluations
export const getProfessorEvaluations = async (semesterId) => {
  try {
    const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/professor/${semesterId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get course evaluation summary
export const getCourseEvaluationSummary = async (semesterId) => {
  try {
    const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/summary/courses/${semesterId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get professor evaluation summary
export const getProfessorEvaluationSummary = async (semesterId) => {
  try {
    const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/summary/professors/${semesterId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Send evaluation results to professors
export const sendEvaluationResults = async (semesterId) => {
  try {
    const response = await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations/send-results/${semesterId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Export evaluation results
export const exportEvaluationResults = async (semesterId, type) => {
  try {
    const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/export/${type}/${semesterId}`, {
      responseType: 'blob'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getEvaluationPeriods = async (semesterId, page, size) => {
  const response = await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations?semesterId=${semesterId}&page=${page || 1}&size=${size || 10}`);
  return response;
};