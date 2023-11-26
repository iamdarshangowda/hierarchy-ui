import React, { useEffect, useRef, useState } from 'react';

const GroupNameEdit = ({ groupData, groupId, dispatch }) => {
  const [groupName, setGroupName] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    setGroupName(groupData.groupName);

    return () => {
      if (messageRef.current) {
        clearTimeout(messageRef.current);
      }
    };
  }, [groupData]);

  const handleGroupName = (e) => {
    const { value } = e.target;
    setGroupName(value);
  };

  const handleUpdateGroupName = () => {
    const data = {
      groupId: groupId,
      updatedName: groupName,
    };

    dispatch({
      type: 'UPDATE_GROUP_NAME',
      payload: data,
    });

    setShowMessage(true);
    messageRef.current = setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-4">
          <label className="w-16">Group Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border p-2 rounded-md w-full"
            value={groupName}
            onChange={handleGroupName}
            required
          />
        </div>
        <button
          className="bg-gray-200 rounded-sm py-1 px-2 text-xs font-semibold disabled:text-gray-400"
          type="button"
          disabled={showMessage}
          onClick={handleUpdateGroupName}
        >
          Update
        </button>
      </div>
      {showMessage && (
        <p className="text-xs text-green-600 font-semibold py-2">Group name updated!</p>
      )}
      <hr className="my-5" />
    </>
  );
};

export default GroupNameEdit;
