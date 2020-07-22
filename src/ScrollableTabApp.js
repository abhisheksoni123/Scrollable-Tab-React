import React, {Component} from 'react';
import './styles/App.scss';
import Header from './components/Header';
import TabComponent from './components/Tab';

export default class TabsComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   let title = 'Demo Container';
    return (
      <div className="App">
        <Header title={title}  />
        <div className="tab_main_content">
          <TabComponent />
        </div>
      </div>
    );
  }
}


