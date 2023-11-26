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

export const updateEmployeeDetails = (state, employeeData) => {
  const { employeeList, groupData } = state;
  const { editingMemberId, memberData } = employeeData;

  const updatedState = {
    groupData,
    employeeList: { ...employeeList, [editingMemberId]: memberData },
  };

  return updatedState;
};

export const updateGroupName = (state, updatedGroupData) => {
  const { employeeList, groupData } = state;
  const { groupId, updatedName } = updatedGroupData;

  const updatedState = {
    groupData: {
      ...groupData,
      [groupId]: { ...groupData[groupId], groupName: updatedName },
    },
    employeeList,
  };

  return updatedState;
};
