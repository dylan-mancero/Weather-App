import React, {Component} from 'react';
import LogInScreen from './LogInScreen';
import MainScreen from './MainScreen';



class App extends Component {

  constructor(props){
    super(props);
    this.state={ loginscreen: true, mainscreen: false, username: "", password: "" };
    this.changeScreen=this.changeScreen.bind(this);
  }

  changeScreen = (e) =>{
    e.preventDefault();
    this.setState({ loginscreen: false });
    this.setState({ mainscreen: true });
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
            {this.state.loginscreen ? <LogInScreen handleUsername={this.handleUsername} handleClick={this.changeScreen} username={this.state.username} /> : null }
            {this.state.mainscreen ? <MainScreen username={this.state.username} /> : null }
          </div>
        </main>
        
      </div>
    );
  }
}

export default App;
