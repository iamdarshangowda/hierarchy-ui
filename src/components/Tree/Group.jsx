import React from 'react';
import { groupData, employeeList } from '../../data/mockData';
import Card from './Card';

const Group = ({ groupId = 1 }) => {
  const { groupHead, subGroups, groupMembers, groupName, role } = groupData[groupId];

  function getColorBasedonRole(role) {
    switch (role) {
      case 'ceo':
        return '#3C6255';
      case 'head':
        return '#61876E';
      case 'lead':
        return '#A6BB8D';
      default:
        return '#FDE5D4';
    }
  }

  const color = getColorBasedonRole(role);

  return (
    <div
      className="border text-center rounded-lg m-4 p-4 flex flex-col items-center"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-gray-100 uppercase drop-shadow-md">
          {groupName}
        </h1>
        <Card memberId={groupHead} role={role} />
        {groupMembers &&
          groupMembers.map((memberId, index) => (
            <Card memberId={memberId} key={index} role={'member'} />
          ))}
      </div>
      <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap">
        {subGroups &&
          subGroups.map((groupId) => <Group groupId={groupId} key={groupId} />)}
      </div>
    </div>
  );
};

export default Group;
