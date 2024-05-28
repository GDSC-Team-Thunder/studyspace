import Timer from "../Timer/timer.tsx";
import List from "../ToDoList/List.tsx";
import Right from "../right.tsx";
import "../../css/App.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        "http://localhost:8000/auth/verify",
        {},
        { withCredentials: true }
      );
      const { status, user, userid } = data;
      setUsername(user);
      setUserId(userid);
      return status
        ? console.log("success")
        : (removeCookie("token", {}), navigate("/login"), console.log(status));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const [hideSidebars, setHideSidebars] = useState<boolean>(false);

  return (
    <div className="App">
      <h1>
        Hello, {username}, {userId}
      </h1>
      <div className="flex justify-between flex-row h-screen w-[95vw]">
        {!hideSidebars && <List />}
        <Timer hideSidebars={hideSidebars} setHideSidebars={setHideSidebars} />
        {!hideSidebars && <Right />}
      </div>
    </div>
  );
}

export default Home;
