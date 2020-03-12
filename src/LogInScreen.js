import React, {Component} from 'react';

class LogInScreen extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div className="login">
        <main>
          <form onSubmit={this.props.handleClick}>
          
            <div className="name">Welcome to our app</div>
            
            <div className="login-box">
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
