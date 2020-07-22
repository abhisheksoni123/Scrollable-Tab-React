import React from 'react';

const RightChevron = (props) => {
  return (
     <div className="chevron_main_div">
      <button className="chevron_button" disabled={props.activeLeftChevronFlag} onClick={props.handleRightChevron}> &#62; </button>
    </div>
  );
};

export default RightChevron;