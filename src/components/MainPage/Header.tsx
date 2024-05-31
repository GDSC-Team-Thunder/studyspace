import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePicture from "../../assets/pfp_photo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegClipboard } from "react-icons/fa";

export default function Header(props: { userId: string; username: string }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(props.userId)
      .then(() => {
        toast.success("Friend ID copied to clipboard!", {
          position: "bottom-right",
        });
      })
      .catch((error) => {
        console.error("Error copying text to clipboard: ", error);
      });
  };

  return (
    <div className="flex flex-row justify-between items-center w-[95vw] mt-5">
      <p className="flex-grow-0 text-[48px] font-bold">studyspace</p>
      {props.userId.length == 0 ? (
        <div className="flex flex-row ml-auto space-x-4">
          <p
            className="flex flex-grow-0 text-[24px] font-bold cursor-pointer"
            onClick={() => navigate("/Signup")}
          >
            sign up
          </p>
          <p
            className="flex flex-grow-0 text-[24px] font-bold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            log in
          </p>
        </div>
      ) : (
        <div
          className="flex flex-row ml-auto cursor-pointer items-center space-x-2"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="flex flex-col">
            <div className="flex w-full h-full">
              <p className="flex flex-grow-0 text-[24px] font-bold">
                {props.username}
              </p>
            </div>
            {hover && (
              <div className="flex relative space-x-1" onClick={handleCopy}>
                <p className="text-[16px] font-bold h-full">
                  ID: {props.userId}
                </p>
                <FaRegClipboard></FaRegClipboard>
              </div>
            )}
          </div>
          <img
            src={profilePicture}
            className="w-10 h-full object-cover border-2 rounded-full overflow-hidden border-[#F32FBC]"
          />
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
}
