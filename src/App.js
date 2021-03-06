import React, {Component} from 'react';
import LogInScreen from './LogInScreen';
import MainScreen from './MainScreen';
import ShowMore from './ShowMore';


class App extends Component {

  constructor(props){
    super(props);
    this.state = { 
      loginscreen: true, 
      mainscreen: false,
      showmorescreen: false, 
      username: "",
      location: "",
      background: "app",
    };
    this.showMainScreen=this.showMainScreen.bind(this);
    this.handleLocation=this.handleLocation.bind(this);
  }
  //function that will pass defined background back to App.js
  //will be called in MainScreen.js
  handleBG=(temp)=>{
    this.setState({background: temp});
  }
  showMainScreen = (e) =>{
    e.preventDefault();
    this.setState({ loginscreen: false });
    this.setState({ mainscreen: true });
  }

  showShowMore = (e) =>{
    e.preventDefault();
    this.setState({ mainscreen: false });
    this.setState({ showmorescreen: true });
  }


  handleUsername = (e) => {
    this.setState(
      {username: e.target.value}
    )
  }
  
  //function for passing location from child(mainscreen) back to parent(App)
  handleLocation = (location) => {
    this.setState({location: location});
  }
  //function for reversing back into search bar from show more screen
  //is called in showmore.js
  handleGoBack = () => {
    this.setState({ showmorescreen: false });
    this.setState({ mainscreen: true });
  }
  

  render() {
    return (
      <div className={this.state.background}>
        
        <main className="">
          <div>        
            {/* Displaying different pages (depends on state) */}
            {this.state.loginscreen ? <LogInScreen handleUsername={this.handleUsername} handleClick={this.showMainScreen} username={this.state.username} /> : null }
            {this.state.mainscreen ? <MainScreen handleLocation={this.handleLocation} handleShowMore={this.showShowMore} username={this.state.username} handleBG={this.handleBG} /> : null }
            {this.state.showmorescreen ? <ShowMore username={this.state.username} location={this.state.location} handleGoBack={this.handleGoBack} /> : null }
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
