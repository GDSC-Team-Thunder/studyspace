import Timer from './components/Timer/timer.tsx'
import List from './components/ToDoList/List.tsx';
import LoginPage from './components/loginPage/LoginPage.tsx';
import './css/App.css';
import { useState } from 'react';
import Right from './components/right';

function App() {
  // const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <div className = "App">
      <div className="flex justify-between flex-row h-screen w-[95vw]">
          <List/>
          <Timer />
          <Right />
      </div>
    </div>
  );
}

export default App
