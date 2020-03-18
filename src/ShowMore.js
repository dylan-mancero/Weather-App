import React, {Component} from 'react';
import { format, fromUnixTime } from 'date-fns';


var output = {};
class ShowMore extends Component {
  constructor(props) {
      super(props);
      this.weatherHandler();
  }

  state = {
    name: this.props.username,
    forecast: [],
    api_key: '4db0d564befccdb49c4954e9d1abb7e4',
    base_url: 'https://api.openweathermap.org/data/2.5/',
    showWeather: 'none',
  }

  weatherHandler = () => {
    var location = this.props.location;
    fetch(this.state.base_url+'weather?q='+location+'&units=metric&APPID='+this.state.api_key)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({location: location});
        if(result.name !== undefined){
          console.log(result)
          this.setState({
            showWeather: 'block',
            location: result.name+", "+result.sys.country,
            temp: Math.round(result.main.temp)+"°C", 
            sunrise: format(fromUnixTime(result.sys.sunrise), 'hh:iia'), 
            sunset: format(fromUnixTime(result.sys.sunset), 'hh:iia'), 
            condition: result.weather[0].main + ' (' + result.weather[0].description + ')'
          });
          
        } else {
          this.setState({
            temp: '', 
            condition: ''
          });
        }
    });
  }

  forecastHandler = () => {
    var location = this.props.location;
    console.log(this.state.base_url+'forecast?q='+location+'&units=metric&APPID='+this.state.api_key);
    fetch(this.state.base_url+'forecast?q='+location+'&units=metric&APPID='+this.state.api_key)
      .then(res => res.json())
      .then(result => {
        console.log(result);
        this.setState({forecast: result.list});

    });
  }


  componentDidMount(){
    this.forecastHandler();
  }


  render() {
    const forecast = this.state.forecast.slice(0,4);
    const results = [];
    for(var i = 0; i < forecast.length; i++){
      results.push(
          <li className="list-group-item">
            {format(fromUnixTime(forecast[i].dt), 'ha')}<br/>
            {Math.round(forecast[i].main.temp)}°C
          </li>
      );
    }
    return (
      <div className="showmore">
        <main>
          <h1>{this.state.location}</h1>
          <h3>{this.state.temp}</h3>
          <hr></hr>
          <p>Sunrise: {this.state.sunrise}</p>
          <p>Sunset: {this.state.sunset}</p>

          
        Forecast:
          <ul className="list-group list-group-horizontal text-center">
            {results}
          </ul>
        </main>
      </div>
    );
  }
}

export default ShowMore;
