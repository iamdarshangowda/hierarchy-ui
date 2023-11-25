import { Dialog } from '@headlessui/react';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { useEffect, useRef, useState } from 'react';

const Modal = ({ isOpen, setIsOpen, employeeList }) => {
  const { editingMemberId } = useEmployeeContext();
  const [memberData, setMemberData] = useState({
    name: '',
    email: '',
    phone: '',
    group: '',
  });
  const isInputChangeRef = useRef(null);

  useEffect(() => {
    const dataFromStore = employeeList[editingMemberId];
    setMemberData(dataFromStore);

    return () => {
      isInputChangeRef.current = false;
    };
  }, [editingMemberId]);

  const handleMemberData = (e) => {
    isInputChangeRef.current = true;
    const { name, value } = e.target;
    console.log(name, value);
    setMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveData = () => {};

  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-4 md:p-6 shadow-lg">
          <Dialog.Title className="text-xl font-semibold mb-10">
            Employee Details
          </Dialog.Title>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="w-16">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border p-2 rounded-md w-full"
                value={memberData.name}
                onChange={handleMemberData}
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
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold mt-10 disabled:text-gray-400"
              onClick={handleSaveData}
              disabled={!isInputChangeRef.current}
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
