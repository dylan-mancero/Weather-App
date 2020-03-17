import React from 'react';
import ShowMore from './ShowMore';

class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.ipLookUp();
  }

  state = {
    name: this.props.username,
    location: "",
    locationFullName: "",
    locationAutomatic: "",
    temp: "",
    condition: "",
    api_key: '4db0d564befccdb49c4954e9d1abb7e4',
    base_url: 'https://api.openweathermap.org/data/2.5/',
    clothes: "default"
  }

  ipLookUp  = () => {
    fetch("http://ip-api.com/json")
      .then(res => res.json())
      .then(result => {
        this.setState({locationAutomatic: result.city+', '+result.country});
      });
  }

  searchHandler = (e) => {
    var location = e.target.value;
    fetch(this.state.base_url+'weather?q='+location+'&units=metric&APPID='+this.state.api_key)
      .then(res => res.json())
      .then(result => {
        this.setState({location: location});
        if(result.name !== undefined){
          console.log(result)
          this.setState({
            locationAvailable: false,
            locationFullName: result.name+", "+result.sys.country, 
            temp: Math.round(result.main.temp)+"°C", 
            condition: result.weather[0].main + ' (' + result.weather[0].description + ')'
          });
          
          
          if (Math.round(result.main.temp)>=20){
            this.setState({clothes: "hot"});
          }
          else if (Math.round(result.main.temp)<20 && result.weather[0].main=="Rain"){
            this.setState({clothes: "rainy"});
          }
          else if (Math.round(result.main.temp)<20){
            this.setState({clothes: "cold"});
          }
          else {
            this.setState({clothes: "default"});
          }


        } else {
          this.setState({
            temp: '', 
            condition: ''
          });
        }
    });
  }

  nameHandler = (e) => {
    this.setState({name: e.target.value});
  }

  render() {
    return (
      <div className="main">
        <main>
          <div className="name-box">
            <div className="name">Welcome, {this.state.name}</div>
          </div>
          <div className="search-box">
            <input type="text" onChange={this.searchHandler} className="search-bar" placeholder="Search..."/>
            <button onClick={this.searchHandler} value={this.state.locationAutomatic}></button>
          </div>

          
          <div className="info-box">
            <div className="location">{this.state.locationFullName}</div>
            <div className="temp">{this.state.temp}</div>
            <div className="cond">{this.state.condition}</div>
            <div>
              <button className="btn-gradient red large" onClick={this.props.handleShowMore}>Show more</button>
            </div>
          </div>
          <div className={this.state.clothes}></div>

        </main>
      </div>
    );
  }
}

export default MainScreen;
