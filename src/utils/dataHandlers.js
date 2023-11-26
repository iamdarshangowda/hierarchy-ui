import { initialEmployeeList, initialGroupData } from '../data/mockData';

export const getRoleBasedonTeam = (currentRole) => {
  switch (currentRole) {
    case 'ceo':
      return 'head';
    case 'head':
      return 'lead';
    default:
      return 'member';
  }
};

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

export const handleCreateNewTeam = (state, teamData) => {
  const { employeeList, groupData } = state;
  const { teamName, reportTo } = teamData;

  // Create new Team
  const teamHeadRole = groupData[reportTo].role;
  const newTeamRole = getRoleBasedonTeam(teamHeadRole);

  const newTeam = {
    groupHead: 0,
    groupMembers: [0],
    groupName: teamName,
    reportTo,
    role: newTeamRole,
    subGroups: [],
  };

  //Add new Team to its Group

  console.log(newTeam);
  return state;
};
