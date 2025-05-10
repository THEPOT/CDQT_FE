import authorizedAxiosInstance from "@/utils/authorizedAxios";
import { BASE_URL } from "@/configs/globalVariables";

export const getProfesserAPI = async () => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Professors`);
};

export const getProfessorScheduleAPI = async (year, week) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Professors/schedule?year=${year}&week=${week}`);
};

export const getProfessorScheduleBySemesterAPI = async (semesterId) => {
  return await authorizedAxiosInstance.get(`${BASE_URL}/Professors/schedule/${semesterId}`);
};
