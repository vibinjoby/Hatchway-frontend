import HttpService from '../network/HttpService';
import serviceConst from '../configs/serviceConst';

export const fetchAllStudents = async (): Promise<any> => {
  const { BASE_URL, STUDENTS_ASSESSMENT } = serviceConst;
  const { data } = await HttpService.get(BASE_URL + STUDENTS_ASSESSMENT);

  return data;
};
