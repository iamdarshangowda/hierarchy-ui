import { Dialog } from '@headlessui/react';
import { useState } from 'react';

const initialValue = {
  name: '',
  email: '',
  phone: '',
  group: '',
};

const AddTeamMemberModal = ({ isOpen, setIsOpen, addToGroup, dispatch }) => {
  const [memberData, setMemberData] = useState(initialValue);

  const handleMemberData = (e) => {
    const { value, name } = e.target;
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMember = (e) => {
    e.preventDefault();
    const data = {
      ...memberData,
      group: addToGroup,
    };
    dispatch({
      type: 'ADD_MEMBER_TO_GROUP',
      payload: data,
    });

    setMemberData(initialValue);
    setIsOpen({ addToGroup: 0, isOpen: false });
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-gray-100 p-4 md:p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-10">
            Member Details
          </Dialog.Title>
          <form className="flex flex-col gap-4" onSubmit={handleCreateMember}>
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
            <div className="flex items-center gap-4">
              <label className="w-16">Group ID:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="border p-2 rounded-md w-full"
                value={addToGroup}
                onChange={handleMemberData}
                required
                disabled
              />
            </div>

            <div className="flex gap-4 justify-end">
              <button
                className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10"
                type="button"
                onClick={() => setIsOpen({ addToGroup: 0, isOpen: false })}
              >
                Close
              </button>
              <button
                className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10 disabled:text-gray-400"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddTeamMemberModal;
