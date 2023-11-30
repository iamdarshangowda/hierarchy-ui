import React, { useEffect, useState } from 'react';
import { findMatch } from '../utils/getSearchResult';
import { useToggleContext } from '../context/ToggleContext';
import { useEmployeeContext } from '../context/EmployeeContext';

const SearchBar = ({ employeeList }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { setEditingMemberId } = useEmployeeContext();
  const { setIsModalOpen } = useToggleContext();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    let matches = findMatch(employeeList, searchValue);
    setSearchResult(matches);
  }, [searchValue]);

  const handleEmployeeModal = (memberId) => {
    setEditingMemberId(memberId);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-md w-full m-4 fixed top-2 left-2 z-10">
      <div className="searchInput bg-white-100 w-full rounded-md relative shadow-md">
        <input
          type="text"
          placeholder="Search employee..."
          onChange={handleSearch}
          value={searchValue}
          className="h-12 w-full outline-none border-none  p-4 shadow-md"
          style={
            searchResult.length
              ? { borderRadius: '6px 6px 0px 0px' }
              : { borderRadius: '6px' }
          }
        />
        <ul
          className="resultBox max-h-52 overflow-y-auto"
          style={searchResult.length ? { display: 'block' } : { display: 'none' }}
        >
          {searchResult.map((member) => (
            <li
              onClick={() => handleEmployeeModal(member.employeeId)}
              key={member.employeeId}
              className="p-4 list-none border-b border-gray-200 last:border-none 
              cursor-pointer bg-gray-50 hover:bg-gray-100 last:rounded-b-md"
            >
              {member.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
