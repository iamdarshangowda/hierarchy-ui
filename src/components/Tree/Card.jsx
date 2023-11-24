import React from 'react';
import { capitalizeEachWord, capitalizeFirstLetter } from '../../utils/stringHelper';

const Card = ({ memberId, color, role, employeeList, handleMember }) => {
  const memberData = employeeList[memberId];
  return (
    <div
      className="text-md font-semibold border w-full bg-gray-200 shadow-md rounded-md"
      style={{ color }}
    >
      <button className="flex gap-2 p-4 w-full hover:bg-white" onClick={handleMember}>
        <p>{capitalizeEachWord(memberData.name)},</p>{' '}
        {role && <span className="font-normal">{capitalizeFirstLetter(role)}</span>}
      </button>
    </div>
  );
};

export default Card;
