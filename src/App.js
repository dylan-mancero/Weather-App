import React, {Component} from 'react';
import Navbar from './Navbar';
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
  

  handleLocation = (location) => {
    this.setState({location: location});
  }

  

  render() {
    return (
      <div className={this.state.background}>
        <Navbar/>
        <main>
          <div>            
            {this.state.loginscreen ? <LogInScreen handleUsername={this.handleUsername} handleClick={this.showMainScreen} username={this.state.username} /> : null }
            {this.state.mainscreen ? <MainScreen handleLocation={this.handleLocation} handleShowMore={this.showShowMore} username={this.state.username} handleBG={this.handleBG} /> : null }
            {this.state.showmorescreen ? <ShowMore username={this.state.username} location={this.state.location} /> : null }
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
