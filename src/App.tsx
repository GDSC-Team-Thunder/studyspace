import Timer from './components/timer.tsx'
import Right from './components/right.tsx'
import List from './components/ToDoList/List.tsx';
import LoginPage from './components/loginPage/loginPage.tsx';
import './css/App.css';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  return (
    <div className = "App">
      {/* <div className="flex justify-center flex-row h-screen w-[97%]">
          <List/>
          <Timer />
          <Right />
      </div> */}
      <LoginPage/>
    </div>
  );
}

export default App
