import React from 'react';
import './popup.css';

const ThemePopup = ({active, setActive, children}) => {
  return (
    <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
      <div className="popup__content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default ThemePopup;