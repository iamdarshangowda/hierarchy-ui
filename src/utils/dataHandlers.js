import { initialEmployeeList, initialGroupData } from '../data/mockData';

export const addInitialState = (payload) => {
  if (payload) {
    return JSON.parse(payload);
  } else {
    return {
      groupData: initialGroupData,
      employeeList: initialEmployeeList,
    };
  }
};
