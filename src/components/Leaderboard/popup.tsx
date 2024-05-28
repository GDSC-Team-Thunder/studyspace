import React from "react";
import XButton from "../../assets/x-icon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface PopupProps {
  userId: string;
}

const Popup: React.FC<PopupProps> = ({ userId }) => {
  const [showModal, setShowModal] = React.useState(false);
  const [inputID, setInputID] = useState<string>("");
  const navigate = useNavigate();

  async function handleClick() {
    const res = await axios.get(`http://localhost:8000/${userId}`);
    const friendsList = res.data.friends;
    const updatedFriends = { friends: [...friendsList, inputID] };

    const status = await axios.put(
      `http://localhost:8000/${userId}`,
      updatedFriends
    );
    console.log(status);
    setInputID("");
  }
  return (
    <>
      <button
        className="text-off-white active:bg-hot-pink font-bold text-base px-6 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        add friends
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-end ">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-transparent"
                  >
                    <img
                      className="w-[30px] h-[30px] mx-3 mt-3 flex-shrink-0"
                      src={XButton}
                      alt="settings"
                    ></img>
                  </button>
                </div>
                <div className="relative pb-4 px-12 flex-auto">
                  <h1 className="text-darkBlue font-black text-xl text-left">
                    add friends
                  </h1>
                  <p className="mt-2 mb-4 text-darkBlue font-semibold leading-relaxed">
                    enter your friend's ID number:
                  </p>
                  <input
                    className="bg-offWhite border-2 w-full border-solid border-darkBlue rounded-lg text-darkBlue p-1 pl-2"
                    placeholder="input ID here"
                    value={inputID}
                    onChange={(e) => setInputID(e.target.value)}
                  ></input>
                </div>
                <div className="flex items-center justify-end p-2">
                  <button
                    className="bg-hotPink text-offWhite font-bold text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                    disabled={inputID.length == 0}
                  >
                    add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Popup;
