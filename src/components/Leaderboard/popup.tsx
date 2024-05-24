import React from "react";
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
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add Friends!
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto text-darkBlue font-semibold text-3xl font-semibold bg-transparent"
                    onClick={() => setShowModal(false)}
                  >
                    <span>×</span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative py-4 px-12 flex-auto">
                  <p className="my-4 text-darkBlue font-semibold leading-relaxed">
                    Add friends by entering their unique ID:
                  </p>
                  <input
                    className="bg-offWhite border-2 w-full border-solid border-darkBlue rounded-lg text-darkBlue p-1"
                    placeholder="Unique ID here..."
                  ></input>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end pt-1 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-hotPink text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    Add
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
