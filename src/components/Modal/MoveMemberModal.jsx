import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { getFilteredGroupList, getGroupLists } from '../../utils/dataListHelpers';

const MoveMemberModal = ({
  isOpen,
  setIsOpen,
  memberData,
  dispatch,
  groupData,
  editingMemberId,
  isMainModalOpen,
}) => {
  const [groupToMove, setGroupToMove] = useState('');
  const [groupList, setGroupList] = useState([]);

  const handleChangeName = (e) => {
    const { value } = e.target;
    setGroupToMove(Number(value));
  };

  const handleMoveMember = (e) => {
    e.preventDefault();
    const data = {
      memberId: editingMemberId,
      groupToMove,
      currentGroup: memberData.group,
    };

    dispatch({
      type: 'MOVE_MEMBER',
      payload: data,
    });

    setIsOpen(false);
    isMainModalOpen(false);
  };

  useEffect(() => {
    const lists = getGroupLists(groupData);

    // Member from HR cant be moved to Design
    const teamReportTo = groupData[memberData.group].reportTo;

    const isMemberFromHRGroup = groupData[teamReportTo].groupName === 'HR';
    let groupsIDToFilter = [memberData.group];
    if (isMemberFromHRGroup) {
      const DESIGN_GROUP = 3;
      groupsIDToFilter.push(...groupData[DESIGN_GROUP].subGroups);
    }

    const filteredList = getFilteredGroupList(lists, groupsIDToFilter);
    setGroupList(filteredList);
  }, [groupData, isOpen]);

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-gray-100 p-4 md:p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-10">
            Move Member To
          </Dialog.Title>
          <form className="flex flex-col gap-4" onSubmit={handleMoveMember}>
            <div className="flex items-center gap-4">
              <label className="w-16">Group:</label>
              <select
                name="group"
                id="group"
                className="py-2 w-full"
                onChange={handleChangeName}
              >
                <option value={0} disabled selected={!groupToMove}>
                  Select Team
                </option>
                {groupList.map((group, index) => (
                  <option value={group.groupId} key={index}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-green-400 rounded-sm py-2 px-4 text-md font-semibold mt-10 disabled:text-gray-200 disabled:bg-gray-400"
                type="submit"
                disabled={!groupToMove}
              >
                Move
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MoveMemberModal;
