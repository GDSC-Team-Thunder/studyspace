import Home from "./components/MainPage/Home.tsx";
import LoginPage from "./components/loginPage/LoginPage.tsx";
import NewUserPage from "./components/loginPage/newUserPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Signup" element={<NewUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
