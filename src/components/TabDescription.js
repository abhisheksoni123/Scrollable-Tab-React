import React from 'react';

const TabDescription = (props) => {
	console.log(props)
  return (
    <div className="tab_description_section">
      {props.description ?  <h2>{props.description}</h2> :<h2>Tab 1</h2>}
    </div>
  );
};

export default TabDescription;