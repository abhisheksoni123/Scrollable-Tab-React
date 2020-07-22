import React from 'react';

const RemoveTab = (props) => {
  return (
    <div className="remove_tab_button_div">
      <button onMouseLeave={props.buttonHoverOut} onMouseEnter={ props.buttonOnHover} onClick={props.deleteEvent} className="remove_tab_button">x</button>
    </div>
  );
};

export default RemoveTab;


