import Timer from './components/Timer/timer.tsx'
import List from './components/ToDoList/List.tsx';
import LoginPage from './components/loginPage/LoginPage.tsx';
import './css/App.css';
import { useState } from 'react';

function App() {
  // const [loggedIn, setLoggedIn] = useState<boolean>(true);
  const [hideSidebars, setHideSidebars] = useState<boolean>(false);

  return (
    <div className = "App">
      <div className="flex justify-between flex-row h-screen w-[95vw]">
          { !hideSidebars && (
          <List/>
          )}
          <Timer hideSidebars={hideSidebars} setHideSidebars={setHideSidebars}/>
          { !hideSidebars && (
          <List/>
          )}
      </div>
    </div>
  );
}

export default App
