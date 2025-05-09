import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

// Get program requirements
export const getProgramRequirementsAPI = async (programId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/DegreeAudits/programs/${programId}/requirements`);
};

// Update program requirements
export const updateProgramRequirementsAPI = async (programId, data) => {
  return await authorizedAxiosInstance.put(`${BASE_URL}/DegreeAudits/programs/${programId}/requirements`, data);
};

// Get batch progress
export const getBatchProgressAPI = async (year, programCode, term) => {
    return await authorizedAxiosInstance.get(`${BASE_URL}/DegreeAudits/batch-progress`, {
      params: {
        Year: year,
        ProgramCode: programCode,
        Term: term
      }
    });
  };

// Get student progress
export const getStudentProgressAPI = async (studentId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/DegreeAudits/students/${studentId}/progress`);
};

// Export audit report
export const exportAuditReportAPI = async (params) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/DegreeAudits/export`, {
    params,
    responseType: 'blob'
  });
};