import { useState, useEffect } from "react";
import InputNumber from 'react-input-number';
import { Switch } from '@headlessui/react'
import Modal from './modal.tsx';
import Settings from '../../assets/settings-bold.svg';
import XButton from '../../assets/x-icon.svg';
import '../../css/settings.css';

interface Section {
  duration: number;
  symbol: string;
  active: boolean;
}

interface SettingsMenuProps {
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  sections: {
    pomodoro: Section;
    short: Section;
    long: Section;
  };
  setSections: React.Dispatch<React.SetStateAction<{
    pomodoro: Section;
    short: Section;
    long: Section;
  }>>;
  hideSidebars: boolean;
  setHideSidebars: React.Dispatch<React.SetStateAction<boolean>>;
}


const SettingsMenu: React.FC<SettingsMenuProps> = ({setTotal, sections, setSections, hideSidebars, setHideSidebars}) => {
  const [show, setShow] = useState(false);
  const [sectionItems, setSectionItems] = useState({
    pomodoro: { name: "pomodoro length:", duration: sections.pomodoro.duration, hours: Math.floor(sections.pomodoro.duration / 3600), minutes: Math.floor((sections.pomodoro.duration % 3600) / 60) },
    short: { name: "short break length:", duration: sections.short.duration, hours: Math.floor(sections.short.duration / 3600), minutes: Math.floor((sections.short.duration % 3600) / 60) },
    long: { name: "long break length:", duration: sections.short.duration, hours: Math.floor(sections.long.duration / 3600), minutes: Math.floor((sections.long.duration % 3600) / 60) }
  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const convertToSeconds = (hours: number, minutes: number) => {
    const seconds = hours * 3600 + minutes * 60;
    return seconds;
  };

  const handlePomodoroHrChange = (event: number) => {
    const duration = convertToSeconds(event, sectionItems.pomodoro.minutes);
    updatePomodoro(duration);
  };

  const handlePomodoroMinChange = (event: number) => { 
    const duration = convertToSeconds(sectionItems.pomodoro.hours, event);
    updatePomodoro(duration);
  };

  const updatePomodoro = (duration: number) => {
    setSectionItems(prevState => ({
      ...prevState,
      pomodoro: {
        ...prevState.pomodoro,
        duration: duration
      }
    }));
  };

  const handleShortHrChange = (event: number) => {
    const duration = convertToSeconds(event, sectionItems.short.minutes);
    updateShort(duration);
  };

  const handleShortMinChange = (event: number) => { 
    const duration = convertToSeconds(sectionItems.short.hours, event);
    updatePomodoro(duration);
  };

  const updateShort = (duration: number) => {
    setSectionItems(prevState => ({
      ...prevState,
      short: {
        ...prevState.short,
        duration: duration
      }
    }));
  };

  const handleLongChange = (event: number) => {
    setSectionItems(prevState => ({
      ...prevState,
      long: {
        ...prevState.long,
        duration: event
      }
    }));
  };

  const saveChanges = () => {
    setSections(prevState => ({
      ...prevState,
      pomodoro: {
        ...prevState.pomodoro,
        duration: sectionItems.pomodoro.duration
      },
      short: {
        ...prevState.short,
        duration: sectionItems.short.duration
      },
      long: {
        ...prevState.long,
        duration: sectionItems.long.duration
      }
    }));
    
    const activeSection = findActiveSection();
    setTotal(sectionItems[activeSection].duration);

    handleClose();
  };

  const findActiveSection = () => {
    const activeSection = Object.keys(sections).find((key) => sections[key as keyof typeof sections].active === true);
    return activeSection ? activeSection as keyof typeof sections : 'pomodoro';
  }

    return (
    <div>
      <button onClick={handleShow} className='bg-transparent p-0'>
          <img className='w-[50px] h-[50px] mx-4 flex-shrink-0' src={Settings} alt="settings"></img>
      </button>

      <Modal show={show} onClose={handleClose}>
        <div className="flex flex-col content-start">
          <div className="flex justify-between align-center">
            <h2 className="text-darkBlue text-xl font-bold">settings</h2>
              <button onClick={handleClose} className='bg-transparent p-0 m-0'>
                <img className='w-[30px] h-[30px] mx-4 flex-shrink-0' src={XButton} alt="settings"></img>
              </button>
          </div>
          
          <div className="">
            <div className="flex flex-row my-8 items-center">
              <p className="text-darkBlue font-semibold mr-4">{sectionItems.pomodoro.name}</p>
              <InputNumber 
              className="bg-offWhite border-2 rounded-lg max-w-12 h-8 text-darkBlue font-semibold text-center" 
              min={0} 
              max={99} 
              value={sectionItems.pomodoro.hours} 
              onChange={handlePomodoroHrChange}
              />
              <p className="text-darkBlue font-semibold mx-2">hr</p>
              <InputNumber 
              className="bg-offWhite border-2 rounded-lg max-w-12 h-8 text-darkBlue font-semibold text-center" 
              min={0} 
              max={99} 
              value={sectionItems.pomodoro.minutes} 
              onChange={handlePomodoroMinChange}
              />
              <p className="text-darkBlue font-semibold ml-2">min</p>
            </div>

            <div className="flex flex-row my-8 items-center">
              <p className="text-darkBlue font-semibold mr-4">{sectionItems.short.name}</p>
              <InputNumber 
              className="bg-offWhite border-2 rounded-lg max-w-12 h-8 text-darkBlue font-semibold text-center" 
              min={0} 
              max={99} 
              value={sectionItems.short.hours} 
              onChange={handleShortHrChange}
              />
              <p className="text-darkBlue font-semibold mx-2">hr</p>
              <InputNumber 
              className="bg-offWhite border-2 rounded-lg max-w-12 h-8 text-darkBlue font-semibold text-center" 
              min={0} 
              max={99} 
              value={sectionItems.short.minutes} 
              onChange={handleShortMinChange}
              />
              <p className="text-darkBlue font-semibold ml-2">min</p>
            </div>

            <div className="flex flex-row my-8 items-center">
              <p className="text-darkBlue font-semibold mr-4">{sectionItems.long.name}</p>
              <InputNumber 
              className="bg-offWhite border-2 rounded-lg max-w-12 h-8 text-darkBlue font-semibold text-center" 
              min={0} 
              max={99} 
              value={sectionItems.long.hours} 
              onChange={handleLongChange}
              />
              <p className="text-darkBlue font-semibold mx-2">hr</p>
              <InputNumber 
              className="bg-offWhite border-2 rounded-lg max-w-12 h-8 text-darkBlue font-semibold text-center" 
              min={0} 
              max={99} 
              value={sectionItems.long.minutes} 
              onChange={handleLongChange}
              />
              <p className="text-darkBlue font-semibold ml-2">min</p>
            </div>
          </div>   

          <div className="flex justify-center items-center my-2 mx-4">
            <p className="text-darkBlue font-semibold mr-3">hide sidebars:</p>
            <Switch
              checked={hideSidebars}
              onChange={() => setHideSidebars(!hideSidebars)}
              className={`${
                hideSidebars ? 'bg-darkBlue' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  hideSidebars ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <div className="mt-6">
            <button className="text-xl px-12 py-2" onClick={saveChanges}>save</button>
          </div>
        </div>
      </Modal>
    </div>
    );
  };
  
  export default SettingsMenu;

  // change default time options every time menu is opened?
  // hours doesn't work...
  // padding around x button that idk where it came from