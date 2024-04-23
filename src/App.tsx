import Timer from './components/Timer/timer.tsx'
import List from './components/ToDoList/List.tsx';
import './css/App.css';

function App() {
  return (
    <div className = "App">
      <div className="flex justify-between flex-row h-screen w-[95vw]">
          <List/>
          <Timer />
          <List />
      </div>
    </div>
  );
}

export default App
