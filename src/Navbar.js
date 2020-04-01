import React, {Component} from 'react';


class Navbar extends Component {
    render(){
        return(
            <nav className="navbar">
                <div className="rlweather">
                    <h5 className="nav-text">RLWeather</h5>
                    <p className="nav-text">The real weather</p>
                </div>
                <div className="group13">
                    <p className="nav-text">Group 13 Ⓒ</p>
                </div>
            </nav>
        );

    }
}

export default Navbar;
