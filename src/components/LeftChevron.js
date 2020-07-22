import React from 'react';

const LeftChevron = (props) => {
  return (
    <div className="chevron_main_div">
      <button className="chevron_button" disabled={props.activeLeftChevronFlag} onClick={props.handleLeftChevron}> &#60; </button>
    </div>
  );
};

export default LeftChevron;