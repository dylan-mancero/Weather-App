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
            feels_like: Math.round(result.main.feels_like)+"°C",
            pressure: Math.round(result.main.pressure)+'pa',
            humidity: Math.round(result.main.humidity)+'%',
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
      const condition = forecast[i].weather[0].main;
      var pic = '';
      if(condition == "Clouds"){
        pic = 'cloud';
      } else if(condition == "Sunny" || condition == "Clear") {
        pic = 'sun';
      } else if(condition == "Snow") {
        pic = 'snow';
      } else if(condition == "Rain") {
        pic = 'rain';
      } else{
        pic = 'sky';
      }
      results.push(
          <li className="list-group-item">
            <img width='40px' src={process.env.PUBLIC_URL+'icons/'+pic+'.png'}></img><br></br>
            {format(fromUnixTime(forecast[i].dt), 'ha')}<br/>
            {Math.round(forecast[i].main.temp)}°C
          </li>
      );
    }
    return (
      <div className="showmore">
        <div className="back-button-container">
            <button  onClick={this.props.handleGoBack}>
              <img className="back-button" src={process.env.PUBLIC_URL+'icons/back.png'}></img>
            </button>
        </div>
        <center>
          <main>
            <h1>{this.state.location}</h1>
            <h3 className="temp">{this.state.temp}</h3>
            <hr></hr>
            <p><span className='small-title'>Sunrise</span> {this.state.sunrise}</p>
            <p><span className='small-title'>Sunset</span> {this.state.sunset}</p>
            <p><span className='small-title'>Feels like</span> {this.state.feels_like}</p>
            <p><span className='small-title'>Pressure</span> {this.state.pressure}</p>
            <p><span className='small-title'>Humidity</span> {this.state.humidity}</p>


          <hr></hr>
            
          <p><strong>Forecast</strong></p>
            <ul className="list-group list-group-horizontal justify-content-center">
              {results}
            </ul>
          </main>
        </center>
      </div>
    );
  }
}

export default ShowMore;
