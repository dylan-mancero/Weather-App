import React, {Component} from 'react';
import LogInScreen from './LogInScreen';
import MainScreen from './MainScreen';
import ShowMore from './ShowMore';


class App extends Component {

  constructor(props){
    super(props);
    this.state = { 
      loginscreen: false, 
      mainscreen: false,
      showmorescreen: true, 
      username: "" 
    };
    this.showMainScreen=this.showMainScreen.bind(this);
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
  

  

  render() {
    return (
      <div className="app">
        <main>
          <div>            
            {this.state.loginscreen ? <LogInScreen handleUsername={this.handleUsername} handleClick={this.showMainScreen} username={this.state.username} /> : null }
            {this.state.mainscreen ? <MainScreen handleShowMore={this.showShowMore} username={this.state.username} /> : null }
            {this.state.showmorescreen ? <ShowMore username={this.state.username} /> : null }
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
