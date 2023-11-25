import React from 'react';
import Card from './Card';
import { getColorBasedonRole } from '../../utils/colorHelpers';
import { useToggleContext } from '../../context/ToggleContext';
import { useEmployeeContext } from '../../context/EmployeeContext';

const CompanyTree = ({ groupId = 1, ...props }) => {
  const { groupData, employeeList } = props;
  const { groupHead, subGroups, groupMembers, groupName, role } = groupData[groupId];
  const { setIsModalOpen } = useToggleContext();
  const { setEditingMemberId } = useEmployeeContext();

  const color = getColorBasedonRole(role);

  const handleMember = (memberId) => {
    setEditingMemberId(memberId);
    setIsModalOpen(true);
  };

  return (
    <div
      className="border text-center rounded-lg m-4 p-4 flex flex-col items-center"
      style={{ backgroundColor: color }}
    >
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-gray-100 uppercase drop-shadow-md">
          {groupName}
        </h1>
        <Card
          memberId={groupHead}
          role={role}
          employeeList={employeeList}
          handleMember={handleMember}
        />
        {groupMembers &&
          groupMembers.map((memberId, index) => (
            <Card
              memberId={memberId}
              key={index}
              role={'member'}
              employeeList={employeeList}
              handleMember={handleMember}
            />
          ))}
      </div>
      <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap">
        {subGroups &&
          subGroups.map((groupId) => (
            <CompanyTree groupId={groupId} key={groupId} {...props} />
          ))}
      </div>
    </div>
  );
};

export default CompanyTree;
