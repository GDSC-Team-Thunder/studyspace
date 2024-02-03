import { useState } from "react";
import XIcon from '../assets/x-icon.svg';
import '../css/settings.css';

const Settings = ({ sections, setSections}) => {
  
    return (
      <div className='settings'>
        {/* <div className='settings-bg'></div> */}
        <div className='flex flex-col'>
            <h3>settings:</h3>
            <button className='bg-transparent p-0'>
                <img className='w-[30px] h-[30px] mx-4 flex-shrink-0' src={XIcon} alt="settings"></img>
            </button>
        </div>
        <p>pomodoro length:</p>
        <p>short break length:</p>
        <p>long break length:</p>
        <p>theme:</p>
        <button>save</button>
      </div>
    );
  };
  
  export default Settings;