import { useEffect, useReducer } from 'react';
import {
  addInitialState,
  handleCreateNewTeam,
  updateEmployeeDetails,
  updateGroupName,
} from '../utils/dataHandlers';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA_FROM_LOCAL_STORAGE':
      return addInitialState(action.payload);
    case 'UPDATE_EMPLOYEE_DETAILS':
      return updateEmployeeDetails(state, action.payload);
    case 'UPDATE_GROUP_NAME':
      return updateGroupName(state, action.payload);
    case 'CREATE_NEW_TEAM':
      return handleCreateNewTeam(state, action.payload);
    default:
      return state;
  }
};

const useHierarchyData = () => {
  const [hierarchyData, dispatch] = useReducer(dataReducer, null);

  useEffect(() => {
    if (!hierarchyData) {
      const data = localStorage.getItem('HIERARCHY_DATA');
      dispatch({
        type: 'ADD_DATA_FROM_LOCAL_STORAGE',
        payload: data,
      });
    } else {
      localStorage.setItem('HIERARCHY_DATA', JSON.stringify(hierarchyData));
    }
  }, [hierarchyData]);

  return [hierarchyData, dispatch];
};

export default useHierarchyData;
