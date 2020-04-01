import React, {Component} from 'react';
import Navbar from './Navbar';

class LogInScreen extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="login">
        <main>
          <Navbar/>
          <form onSubmit={this.props.handleClick}>
            <div className="login-box">
              <div className="alert alert-secondary text-center">Login with your name to continue.</div>
              <input
                className="login-bar" 
                type="text" 
                placeholder="Enter Your Name" 
                value={this.props.username}
                onChange={this.props.handleUsername}
              />
            </div>
            <button className="login-button">
              Login
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default LogInScreen;
