import React, {Component} from 'react';
var output = {};
class ShowMore extends Component {
  constructor(props) {
      super(props);
      this.weatherHandler();
  }

  state = {
    name: this.props.username,
    output: {},
    api_key: '4db0d564befccdb49c4954e9d1abb7e4',
    base_url: 'https://api.openweathermap.org/data/2.5/',
    showWeather: 'none',
  }

  convert = (unixtimestamp) => {
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(unixtimestamp*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var convdataTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return convdataTime;
   }

  weatherHandler = () => {
    var location = "London";
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
            sunrise: this.convert(result.sys.sunrise), 
            sunset: this.convert(result.sys.sunset), 
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

  

  render() {
    return (
      <div className="showmore">
        <main>
          <h1>{this.state.location}</h1>
          <h3>{this.state.temp}</h3>
          <hr></hr>
          <p>Sunrise: {this.state.sunrise}</p>
          <p>Sunset: {this.state.sunset}</p>
        </main>
      </div>
    );
  }
}

export default ShowMore;
