import './App.css';
import CompanyTree from './components/Tree/CompanyTree';
import useHierarchyData from './hooks/useHierarchyData';

function App() {
  const [state] = useHierarchyData();

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
    </main>
  );
}

export default App;
