import React from 'react';
import { employeeList } from '../../data/mockData';

const Card = ({ memberId, color, role }) => {
  const memberData = employeeList[memberId];
  return (
    <div className="text-md font-semibold flex gap-2 border p-4 w-full" style={{ color }}>
      <p>{memberData.name},</p> {role && <span className="font-normal">{role}</span>}
    </div>
  );
};

export default Card;
