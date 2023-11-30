import { initialEmployeeList, initialGroupData } from '../data/mockData';

export const getRoleBasedOnTeam = (currentRole) => {
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

export const createNewTeam = (state, teamData) => {
  const { employeeList, groupData } = state;
  const { teamName, reportTo } = teamData;

  // Create new Team
  const teamHeadRole = groupData[reportTo].role;
  const newTeamRole = getRoleBasedOnTeam(teamHeadRole);

  const newTeam = {
    groupHead: 0,
    groupMembers: [],
    groupName: teamName,
    reportTo,
    role: newTeamRole,
    subGroups: [],
  };

  // Get key to insert
  let keyToInsert = 2;
  while (groupData[keyToInsert]) {
    keyToInsert++;
  }

  //Add new Team to its Group
  const updatedGroup = {
    ...groupData,
    [reportTo]: {
      ...groupData[reportTo],
      subGroups: [...groupData[reportTo].subGroups, keyToInsert],
    },
    [keyToInsert]: newTeam,
  };

  const updatedState = {
    employeeList,
    groupData: updatedGroup,
  };

  return updatedState;
};

export const addMemberToGroup = (state, memberData) => {
  const { employeeList, groupData } = state;

  let keyToInsertMember = 2;
  while (employeeList[keyToInsertMember]) {
    keyToInsertMember++;
  }

  // Update the employee list
  const updatedEmployeeList = {
    ...employeeList,
    [keyToInsertMember]: memberData,
  };

  // Update this member to the group
  const group = groupData[memberData.group];
  let updatedMemberGroup = {};

  // Check if group has a team lead
  if (group.groupHead) {
    updatedMemberGroup = {
      ...group,
      groupMembers: [...group.groupMembers, keyToInsertMember],
    };
  } else {
    updatedMemberGroup = {
      ...group,
      groupHead: keyToInsertMember,
    };
  }

  const updatedGroupData = {
    ...groupData,
    [memberData.group]: updatedMemberGroup,
  };

  const updatedState = {
    employeeList: updatedEmployeeList,
    groupData: updatedGroupData,
  };

  return updatedState;
};

export const deleteMember = (state, memberToDelete) => {
  const { employeeList, groupData } = state;
  const { editingMemberId, memberGroup, membersGroupId } = memberToDelete;

  delete employeeList[editingMemberId];

  const updatedGroup = {
    ...memberGroup,
    groupMembers: memberGroup.groupMembers.filter(
      (memberId) => memberId !== editingMemberId
    ),
  };

  const updatedState = {
    employeeList,
    groupData: { ...groupData, [membersGroupId]: updatedGroup },
  };

  return updatedState;
};

export const moveMember = (state, memberDetails) => {
  const { employeeList, groupData } = state;
  const { memberId, groupToMove, currentGroup } = memberDetails;

  const updatedEmployee = {
    ...employeeList[memberId],
    group: groupToMove,
  };

  const updatedEmployeeList = {
    ...employeeList,
    [memberId]: updatedEmployee,
  };

  const updatedCurrentMemberGroup = {
    ...groupData[currentGroup],
    groupMembers: groupData[currentGroup].groupMembers.filter((id) => id !== memberId),
  };

  const updatedNewMemberGroup = {
    ...groupData[groupToMove],
    groupMembers: [...groupData[groupToMove].groupMembers, memberId],
  };

  const updatedGroup = {
    ...groupData,
    [currentGroup]: updatedCurrentMemberGroup,
    [groupToMove]: updatedNewMemberGroup,
  };

  const updatedState = {
    employeeList: updatedEmployeeList,
    groupData: updatedGroup,
  };

  return updatedState;
};
