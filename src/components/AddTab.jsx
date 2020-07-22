import React from 'react';

const AddTab = (props) => {
  return (
    <div className="addTab_button">
      <button onClick={props.handleExtraTab} className="button_body">+</button>
    </div>
  );
};

export default AddTab;