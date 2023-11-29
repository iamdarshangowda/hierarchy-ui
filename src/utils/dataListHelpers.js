export const getGroupLists = (groupData) => {
  let groupList = [];

  for (let key in groupData) {
    if (!groupData[key].subGroups?.length) {
      groupList[key] = groupData[key].groupName;
    }
  }

  return groupList;
};

export const getFilteredGroupList = (groupList, groupToFilter) => {
  return groupList.filter((group, index) => index !== groupToFilter);
};
