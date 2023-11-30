export const getGroupLists = (groupData) => {
  let groupList = [];

  for (let key in groupData) {
    if (!groupData[key].subGroups?.length) {
      groupList[key] = groupData[key].groupName;
    }
  }

  return groupList;
};

export const getFilteredGroupList = (groupList, groupsToFilter) => {
  let filteredArr = [];
  groupList.forEach((group, index) => {
    if (!groupsToFilter.includes(index)) {
      filteredArr.push({
        groupName: group,
        groupId: index,
      });
    }
  });

  return filteredArr;
};
