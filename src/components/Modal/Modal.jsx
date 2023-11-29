import { Dialog } from '@headlessui/react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { useEffect, useRef, useState } from 'react';
import GroupNameEdit from '../GroupNameEdit';
import AddTeamModal from './AddTeamModal';

const initialValue = {
  name: '',
  email: '',
  phone: '',
  group: '',
};

const Modal = ({ isOpen, setIsOpen, groupData, employeeList, dispatch }) => {
  const { editingMemberId } = useEmployeeContext();
  const [memberData, setMemberData] = useState(initialValue);
  const [isDeptHead, setIsDeptHead] = useState({
    isAddNewTeam: false,
    isEditGroupName: false,
    groupData: '',
    groupId: '',
  });
  const isInputChangeRef = useRef(null);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  useEffect(() => {
    const dataFromStore = employeeList[editingMemberId];
    setMemberData(dataFromStore);

    const group = groupData[dataFromStore.group];
    if (group.groupHead === editingMemberId && group.role !== 'lead') {
      setIsDeptHead({
        isAddNewTeam: true,
        isEditGroupName: true,
        groupData: group,
        groupId: dataFromStore.group,
      });
    } else if (group.groupHead === editingMemberId) {
      setIsDeptHead({
        isAddNewTeam: false,
        isEditGroupName: true,
        groupData: group,
        groupId: dataFromStore.group,
      });
    } else {
      setIsDeptHead({
        isAddNewTeam: false,
        isEditGroupName: false,
        groupData: '',
        groupId: '',
      });
    }

    return () => {
      isInputChangeRef.current = false;
    };
  }, [editingMemberId]);

  const handleMemberData = (e) => {
    isInputChangeRef.current = true;
    const { name, value } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = { editingMemberId, memberData };
    dispatch({
      type: 'UPDATE_EMPLOYEE_DETAILS',
      payload: data,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4 md:p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-10">
            Employee Details
          </Dialog.Title>
          {isDeptHead.isEditGroupName && (
            <GroupNameEdit
              groupData={isDeptHead.groupData}
              dispatch={dispatch}
              groupId={isDeptHead.groupId}
            />
          )}
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <div className="flex items-center gap-4">
              <label className="w-16">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border p-2 rounded-md w-full"
                value={memberData.name}
                onChange={handleMemberData}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-16">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                className="border p-2 rounded-md w-full"
                value={memberData.email}
                onChange={handleMemberData}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-16">Phone:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="border p-2 rounded-md w-full"
                value={memberData.phone}
                onChange={handleMemberData}
                required
              />
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
                className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10 disabled:text-gray-400"
                type="submit"
                disabled={!isInputChangeRef.current}
              >
                Save
              </button>
            </div>
          </form>
          {isDeptHead.isAddNewTeam && (
            <button
              className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10"
              type="button"
              onClick={() => setIsTeamModalOpen(true)}
            >
              Add New Team
            </button>
          )}
        </Dialog.Panel>
      </div>

      <AddTeamModal
        isOpen={isTeamModalOpen}
        setIsOpen={setIsTeamModalOpen}
        reportTo={isDeptHead.groupId}
        dispatch={dispatch}
      />
    </Dialog>
  );
};

export default Modal;
