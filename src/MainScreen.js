import React from 'react';
import WeatherDetails from './WeatherDetails';
import CurrentTime from './CurrentTime';



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
    showWeather: false,
    background: "app",


    clothesHead: "default",
    accessory1: "default",
    accessory2: "default",
    accessory3: "default",
    clothesTop: "default",
    clothesBottom: "default",
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
            showWeather: true,
            locationAvailable: false,
            locationFullName: result.name+", "+result.sys.country, 
            temp: Math.round(result.main.temp)+"°C", 
            condition: result.weather[0].main + ' (' + result.weather[0].description + ')'
          });

          this.props.handleLocation(this.state.locationFullName);
          
          if (Math.round(result.main.temp) < 0){
            // Less than 0
            this.setState({clothesHead: 'winter-hat'});
            this.setState({clothesTop: 'jacket-4'});
            this.setState({clothesBottom: 'mittens'});
            this.props.handleBG("coldbg");
          }

          else if (Math.round(result.main.temp) > 25){
            // 25 and more
            this.setState({clothesHead: 'glasses'});
            this.setState({clothesTop: 'polo'});
            this.setState({clothesBottom: 'shorts'});
            this.props.handleBG("app");
          }
          
          else if (Math.round(result.main.temp) >= 15){
            // 15 - 25
            this.setState({clothesHead: "overall"});
            this.setState({clothesTop: "hoodie"});
            this.setState({clothesBottom: "sneaker"});
            this.props.handleBG("toohot");
          }
          
          else {
            // 0 - 15
            this.setState({clothesHead: 'hat'});
            this.setState({clothesTop: 'jacket-4'});
            this.setState({clothesBottom: 'pants'});
          }

          if(result.weather[0].main == "Rain"){
            this.setState({accessory1: "umbrella"});
            this.setState({accessory2: "boot-2"});
            this.setState({accessory3: "shopping-bag"});
          } else if (result.weather[0].main == "Clouds") {
            this.setState({accessory1: "cap"});
            this.setState({accessory2: "pamela"});
            this.setState({accessory3: "portfolio"});
          } else if (result.weather[0].main == "Clear") {
            this.setState({accessory1: "hat"});
            this.setState({accessory2: "suitcase"});
            this.setState({accessory3: "hand-bag"});
          } else if (result.weather[0].main == "Snow") {
            this.setState({accessory1: "gloves"});
            this.setState({accessory2: "boot-1"});
            this.setState({accessory3: "hand-bag"});
          } else {
            this.setState({accessory1: "tie"});
            this.setState({accessory2: "socks"});
            this.setState({accessory3: "necklace"});
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
          { 
            this.state.showWeather? 
              <WeatherDetails 
                locationFullName={this.state.locationFullName}
                temp={this.state.temp}
                condition={this.state.condition}
                clothesHead={this.state.clothesHead}
                clothesTop={this.state.clothesTop}
                clothesBottom={this.state.clothesBottom}
                accessory1={this.state.accessory1}
                accessory2={this.state.accessory2}
                accessory3={this.state.accessory3}
                handleShowMore={this.props.handleShowMore}
              />
              :
              <CurrentTime></CurrentTime>
          }
          
        </main>

      </div>
    );
  }
}

export default MainScreen;
