import './App.css';
import AddTeamMemberModal from './components/Modal/AddMemberModal';
import Modal from './components/Modal/Modal';
import CompanyTree from './components/Tree/CompanyTree';
import { useToggleContext } from './context/ToggleContext';
import useHierarchyData from './hooks/useHierarchyData';

function App() {
  const [hierarchyData, dispatch] = useHierarchyData();
  const { isModalOpen, setIsModalOpen, memberModal, setMemberModal } = useToggleContext();

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
      <AddTeamMemberModal
        isOpen={memberModal.isOpen}
        setIsOpen={setMemberModal}
        addToGroup={memberModal.addToGroup}
        dispatch={dispatch}
      />
    </main>
  );
}

export default App;
