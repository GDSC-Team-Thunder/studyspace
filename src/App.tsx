import Timer from './components/Timer/timer.tsx'
import List from './components/ToDoList/List.tsx';
import LoginPage from './components/loginPage/LoginPage.tsx';
import './css/App.css';
import { useState } from 'react';

function App() {
  // const [loggedIn, setLoggedIn] = useState<boolean>(true);

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
