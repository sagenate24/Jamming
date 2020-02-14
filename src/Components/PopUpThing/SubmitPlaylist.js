import React from "react";
import Popup from "reactjs-popup";

export default () => (
  <Popup trigger={<button>Trigger</button>} position="top center">
    {close => (
      <div>
        <p style={{color: '#000'}}>Playlist Empty</p>
        <a style={{color: '#000'}} className="close" onClick={close}>
          {/* &times; */}
          Hello
        </a>
      </div>
    )}
  </Popup>
);