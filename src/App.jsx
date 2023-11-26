import './App.css';
import Modal from './components/Modal/Modal';
import CompanyTree from './components/Tree/CompanyTree';
import { useToggleContext } from './context/ToggleContext';
import useHierarchyData from './hooks/useHierarchyData';

function App() {
  const [hierarchyData, dispatch] = useHierarchyData();
  const { isModalOpen, setIsModalOpen } = useToggleContext();

  if (!hierarchyData) {
    return (
      <h1 className="flex justify-center items-center min-h-screen text-3xl font-semibold">
        Loading...
      </h1>
    );
  }

  const { groupData, employeeList } = hierarchyData;

  return (
    <main>
      <CompanyTree groupData={groupData} employeeList={employeeList} />
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        groupData={groupData}
        employeeList={employeeList}
        dispatch={dispatch}
      />
    </main>
  );
}

export default App;
