import Timer from './components/timer.tsx'
import Left from './components/left.tsx'
import Right from './components/right.tsx'
import List from './components/ToDoList/List.tsx';
import './css/App.css';

function App() {
  return (
    <div className = "App">
      <div className="top-level">
          <List/>
          <Timer />
          <Right />
      </div>
    </div>
  );
}

export default App
