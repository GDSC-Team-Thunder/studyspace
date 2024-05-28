import React from "react";
import XButton from "../../assets/x-icon.svg";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import axios from "axios";
import friendsList from "./Leaderboard";

export default function Popup() {
  const [showModal, setShowModal] = React.useState(false);

  async function handleClick() {
    setShowModal(false);
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
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-end p-2 mt-3">
                  <button onClick={() => setShowModal(false)} className='bg-transparent p-0 m-0'>
                    <img className='w-[30px] h-[30px] mx-4 flex-shrink-0' src={XButton} alt="settings"></img>
                  </button>
                  {/* <button
                    className="p-1 ml-auto text-darkBlue font-semibold text-3xl font-semibold bg-transparent"
                    onClick={() => setShowModal(false)}
                  >
                    <span>×</span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative py-4 px-12 flex-auto">
                  <h1 className="text-darkBlue font-black text-xl text-left">add friends</h1>
                  <p className="mt-2 mb-4 text-darkBlue font-semibold leading-relaxed">
                    enter your friend's ID number:
                  </p>
                  <input
                    className="bg-offWhite border-2 w-full border-solid border-darkBlue rounded-lg text-darkBlue p-1 pl-2"
                    placeholder="input ID here"
                  ></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-2">
                  <button
                    className="bg-hotPink text-offWhite font-bold text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
