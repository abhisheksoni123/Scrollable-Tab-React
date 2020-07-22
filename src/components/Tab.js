import React, {Component} from 'react';
import AddTab from './AddTab';
import TabDescription from './TabDescription';
import RemoveTab from './RemoveTab';
import LeftChevron from './LeftChevron';
import RightChevron from './RightChevron';
import Modal from 'react-modal';
import OptionModal from './OptionModal';

export default class TabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.handleExtraTab = this.handleExtraTab.bind(this);
    this.showCurrentTab = this.showCurrentTab.bind(this);
    this.handleRemoveTab = this.handleRemoveTab.bind(this);
    this.handleRightChevron = this.handleRightChevron.bind(this);
    this.handleLeftChevron = this.handleLeftChevron.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseHover = this.onMouseHover.bind(this);
    this.state = {
      tab : [],
      tabLenght : 3,
      currentClickedTab : "Tab 1",
      activeIndex : "Tab 1",
      closeTabFlag : false,
      activeTabAfterClose : "",
      activeRightChevronFlag : false,
      activeLeftChevronFlag : false,
      closeButtonFlag : false,
      selectedOption : false,
      modalMessage : '',
    };
    this.defaultTab(this.state.tabLenght);
  }

  componentDidMount (){}
  componentDidUpdate(prevProps) {}
  componentWillMount() {
    Modal.setAppElement('body');
  }
  //handle Extra Tabs
  handleExtraTab = () => {
    if(this.state.tab.length < 10){
      var getCurrentTabsList;
      getCurrentTabsList = Object.assign([], this.state.tab);
      let lastElement = getCurrentTabsList.slice(-1).pop();
      var res = lastElement.split(" ");
      var newTab = parseInt(res[1])+1;
      this.state.tab.push('Tab'+" "+ newTab)
      this.setState({
        tab: this.state.tab
      })
    }else{
      this.setState(() => ({
        selectedOption: true,
        modalMessage : "More Than 10 Tabs not Allowed"
      }));
    }
    if(this.activeRightChevron() == true){
      this.setState({
        activeRightChevronFlag : true,
        activeLeftChevronFlag : true
      })
    }
  };
  activeRightChevron = () => {
    if (this.myRef.current.scrollWidth > this.myRef.current.offsetWidth) {
       return true;
    }else{
      return false;
    }
  }
  defaultTab = (lenght) => {
    for(let i=0; i<lenght; i++){
      this.state.tab.push("Tab"+" "+(i+1))
    }
  };
  showCurrentTab(e){
    var currentClickedTab = e.target.getAttribute("data-index");
    this.setState({
      currentClickedTab : currentClickedTab,
      activeIndex: currentClickedTab 
    });
  }
  handleRemoveTab = (name,index,e) => {
    if(this.state.tab.length > 1){
      const tabs = Object.assign([], this.state.tab);
      const copyTab = [];
      for(let i=0; i<tabs.length; i++){
        if(tabs[i] == name){
          let currentClickedTab = tabs[i-1];
          this.setState({
            activeTabAfterClose : tabs[0],
            activeIndex: tabs[0],
            selectedOption: true,
            modalMessage : name +" "+ "is closed !!"
          })
        }else{
         copyTab.push(tabs[i]);
        }
        this.setState({
          tab : copyTab,        
        })   
      }
      if(this.activeRightChevron() == false){
      this.setState({
        activeRightChevronFlag : false,
        activeLeftChevronFlag : false,
      })
    }
    }else{
      this.setState({
        selectedOption: true,
        modalMessage : "One Tab Must Be Active!!",
        tab : ["Tab 1"],
      })
    } 
  }
  //handle left and right chevrons
  handleLeftChevron = (e) => {
    this.myRef.current.scrollLeft += -50;
  }
  handleRightChevron = (e) => {
    this.myRef.current.scrollLeft += 50;
  }
  //handle close tab button
  onMouseHover = (e) => {
    this.setState({
      closeButtonFlag : true
    })
  }
  onMouseOut = (e) => {
   this.setState({
      closeButtonFlag : true
    }) 
  }
   buttonOnHover = (e) => {
    this.setState({
        closeButtonFlag : true
      })
    return this.state.closeButtonFlag;
  }
   onMouseDivOut = (e) => {
    this.setState({
        closeButtonFlag : false
      })
    return this.state.closeButtonFlag;
  }
  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = 'block';
    // update state
    var data = this.state.tab;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({tab: data});
  }
  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    this.over = e.target;
  }
  handleClearSelectedOption = () => {
      this.setState(() => ({ selectedOption: undefined }));
  };
  render() {
    return (
      <>
      <div onMouseLeave={this.onMouseDivOut} onMouseEnter={this.buttonOnHover} className="main_li_container"> 
        <LeftChevron activeLeftChevronFlag={this.state.activeLeftChevronFlag == false}  handleLeftChevron={this.handleLeftChevron} /> 
        <ul onDragOver={this.dragOver.bind(this)} id="myDIV"   ref={this.myRef} className="ul_tabs_style">
          {this.state.tab.map((name, index) => {
            return <li  draggable='true' data-id={index} key={index}
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)} data-index={name} onClick={this.showCurrentTab}  style={ (this.state.activeIndex || this.state.activeTabAfterClose) == name ? { background: 'bisque', color: 'black' } : null} key={ index } >
            {name}
            {
              this.state.closeButtonFlag == true ?  <RemoveTab buttonOnHover={this.onMouseHover} buttonHoverOut={this.onMouseOut}  deleteEvent={this.handleRemoveTab.bind(this, name, index)} />: null
            }
            </li>;
          },this)}
        </ul>
        <RightChevron activeLeftChevronFlag={this.state.activeLeftChevronFlag == false} handleRightChevron={this.handleRightChevron} /> 
        <AddTab handleExtraTab={this.handleExtraTab} />
        </div>
        <TabDescription description={this.state.currentClickedTab} />
        <OptionModal selectedOption = {this.state.selectedOption}
        handleClearSelectedOption = {this.handleClearSelectedOption} modalMessage = {this.state.modalMessage} />
      </>
    );
  }
}


