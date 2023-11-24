import './App.css';
import Modal from './components/Modal/Modal';
import CompanyTree from './components/Tree/CompanyTree';
import { useToggleContext } from './context/ToggleContext';
import useHierarchyData from './hooks/useHierarchyData';

function App() {
  const [state] = useHierarchyData();
  const { isModalOpen, setIsModalOpen } = useToggleContext();

  if (!state) {
    return (
      <h1 className="flex justify-center items-center min-h-screen text-3xl font-semibold">
        Loading...
      </h1>
    );
  }

  const { groupData, employeeList } = state;

  return (
    <main>
      <CompanyTree groupData={groupData} employeeList={employeeList} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </main>
  );
}

export default App;
