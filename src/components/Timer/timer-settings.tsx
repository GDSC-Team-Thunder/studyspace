import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
// import XIcon from '../../assets/x-icon.svg';
import '../../css/settings.css';

const Settings = ({ sections, setSections }) => {

    return (
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
      >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <button>Close</button>
          <button>Save changes</button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
    );
  };
  
  export default Settings;