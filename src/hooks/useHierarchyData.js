import { useEffect, useReducer } from 'react';
import { addInitialState } from '../utils/dataHandlers';

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DATA_FROM_LOCAL_STORAGE':
      const data = addInitialState(action.payload);
      return data;
    default:
      throw new Error('Unknown action');
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
