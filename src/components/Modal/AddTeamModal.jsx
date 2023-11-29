import { Dialog } from '@headlessui/react';
import { useState } from 'react';

const AddTeamModal = ({ isOpen, setIsOpen, reportTo, dispatch }) => {
  const [teamName, setTeamName] = useState('');

  const handleChangeName = (e) => {
    const { value } = e.target;
    setTeamName(value);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    const data = {
      teamName,
      reportTo,
    };
    dispatch({
      type: 'CREATE_NEW_TEAM',
      payload: data,
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-gray-100 p-4 md:p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-10">
            Team Details
          </Dialog.Title>
          <form className="flex flex-col gap-4" onSubmit={handleCreateTeam}>
            <div className="flex items-center gap-4">
              <label className="w-16">Name:</label>
              <input
                type="text"
                name="teamName"
                id="teamName"
                className="border p-2 rounded-md w-full"
                value={teamName}
                onChange={handleChangeName}
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

export default AddTeamModal;
