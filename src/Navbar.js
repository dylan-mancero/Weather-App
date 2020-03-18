import React, {Component} from 'react';


class Navbar extends Component {
    render(){
        return(
            <nav className="navbar">
              <div className="rlweather">
                <h3>RLWeather</h3>
                <p>The real weather</p>
              </div>
              <div className="group13">
                <p>Group 13 Ⓒ</p>
              </div>
            </nav>
            
        );

    }
}

export default Navbar;
