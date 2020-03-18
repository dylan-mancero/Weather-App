import React, {Component} from 'react';
import moment from "moment";



class CurrentTime extends Component {
    state = {
        time_h: moment().format("HH"),
        time_m: moment().format("MM"),
        time_s: moment().format("ss"),
        timer: null,
    }

    componentDidMount() {
        this.state.timer = setInterval(
            () => (
                this.setState({
                    time_h: moment().format("HH"),
                    time_m: moment().format("MM"),
                    time_s: moment().format("ss")
                })
            )
        , 100)
    }

    componentWillUnmount(){
        clearInterval(this.state.timer);
    }

    render(){
        return(
            <div className>
                <h1 className="time">{this.state.time_h}</h1>
                <h1 className="time">{this.state.time_m}</h1>
                <h1 className="time">{this.state.time_s}</h1>
            </div>
            
        );

    }
}

export default CurrentTime;
