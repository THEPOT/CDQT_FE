import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getTranscriptAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/me/detailed-transcript`);
};

export const exportTranscriptAPI = async (format) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/me/transcript/export?format=${format}`, {
    responseType: 'blob'
  });
};

export const getStudentTranscriptsAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/transcripts`);
};

export const submitGradeAPI = async (data) => {
  return await authorizedAxiosInstance.post(`${BASE_URL}/Grades`, data);
};

export const getStudentsByGpaAPI = async (minGPA, maxGPA) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/by-gpa`, {
    params: { minGPA, maxGPA }
  });
};

export const getFailedCoursesAPI = async (studentId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Students/${studentId}/failed-courses`);
};