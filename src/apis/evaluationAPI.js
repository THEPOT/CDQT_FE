import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Questions Management
export const getEvaluationQuestionsAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/EvaluationQuestions`);
};

export const createEvaluationQuestionAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/EvaluationQuestions`, data);
};

export const updateEvaluationQuestionAPI = async (id, data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/EvaluationQuestions/${id}`, data);
};

export const deleteEvaluationQuestionAPI = async (id) => {
  return await authorizedAxiosInstance.delete(`${BASE_URL}/EvaluationQuestions/${id}`);
};

// Midterm Evaluation Management
export const createMidtermEvaluationPeriodAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations/midterm/period`, data);
};

export const getCurrentMidtermPeriodAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/period/current`);
};

export const submitMidtermEvaluationAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations/midterm`, data);
};

export const getStudentMidtermEvaluationsAPI = async (studentId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/midterm/student/${studentId}`);
};

export const getProfessorMidtermEvaluationsAPI = async (classId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/midterm/professor/${classId}`);
};

export const getMidtermSummaryAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/midterm/summary/${semesterId}`);
};

export const exportMidtermEvaluationsAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/midterm/export/${semesterId}`, {
    responseType: 'blob'
  });
};

// Evaluation Period Management
export const createEvaluationPeriodAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations/period`, data);
};

export const getCurrentEvaluationPeriod = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/period/current`);
};

export const getEvaluationPeriods = async (semesterId, page, pageSize) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/periods/${semesterId}?page=${page}&pageSize=${pageSize}`);
};

export const updateEvaluationPeriod = async (data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/CourseEvaluations/period`, data);
};

// Submit Evaluation
export const submitCourseEvaluationAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations`, data);
};

// Student Status
export const getStudentEvaluationStatusAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/status/${semesterId}`);
};

// Summary Reports
export const getCourseSummaryAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/summary/courses/${semesterId}`);
};

export const getProfessorSummaryAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/summary/professors/${semesterId}`);
};

// Send Results
export const sendEvaluationResults = async (semesterId) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/CourseEvaluations/send-results/${semesterId}`);
};

export const sendEvaluationResultsAPI = sendEvaluationResults; // Alias for backward compatibility

// Export Reports
export const exportEvaluationResults = async (semesterId, type) => {
  const endpoint = type === 'courses' 
    ? `${BASE_URL}/CourseEvaluations/export/courses/${semesterId}`
    : `${BASE_URL}/CourseEvaluations/export/professors/${semesterId}`;
    
  return await authorizedAxiosInstance.get(endpoint, {
    responseType: 'blob'
  });
};

export const exportCourseSummaryAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/export/courses/${semesterId}`, {
    responseType: 'blob'
  });
};

export const exportProfessorSummaryAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/CourseEvaluations/export/professors/${semesterId}`, {
    responseType: 'blob'
  });
};