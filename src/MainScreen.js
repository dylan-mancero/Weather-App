import React from 'react';
import WeatherDetails from './WeatherDetails';
import Navbar from './Navbar';
import CurrentTime from './CurrentTime';



class MainScreen extends React.Component {
  constructor(props){
    super(props);
    this.ipLookUp();
  }

  state = {
    //state storage for resources needed from the API fetch
    name: this.props.username,
    location: "",
    locationFullName: "",
    locationAutomatic: "",
    temp: "",
    condition: "",
    api_key: '4db0d564befccdb49c4954e9d1abb7e4',
    base_url: 'https://api.openweathermap.org/data/2.5/',
    showWeather: false,
    //background is default colour
    background: "app",

    //clothes are file names
    clothesHead: "default",
    accessory1: "default",
    accessory2: "default",
    accessory3: "default",
    clothesTop: "default",
    clothesBottom: "default",


    navbar: true,
  }
  //handles the location when the button on the right 
  //of search bar
  ipLookUp  = () => {
    fetch("http://ip-api.com/json")
      .then(res => res.json())
      .then(result => {
        this.setState({locationAutomatic: result.city+', '+result.country});
      });
  }
  //handles the event everytime the user makes a change in the search bar
  searchHandler = (e) => {
    // location variable is what the user typed
    var location = e.target.value;
    //api call is saved in state base_url
    fetch(this.state.base_url+'weather?q='+location+'&units=metric&APPID='+this.state.api_key)
      .then(res => res.json())
      .then(result => {
        this.setState({location: location});
        if(result.name !== undefined){
          //debuggin purposes
          console.log(result)
          this.setState({
            //sets components into view
            showWeather: true,
            locationAvailable: false,
            navbar: false,
            locationFullName: result.name+", "+result.sys.country, 
            temp: Math.round(result.main.temp)+"°C", //stores the temperature
            condition: result.weather[0].main + ' (' + result.weather[0].description + ')'
          });

          this.props.handleLocation(this.state.locationFullName);
          

          //Really cold temperature
          if (Math.round(result.main.temp) <= 4){
            this.setState({clothesHead: 'winter-hat'});
            this.setState({clothesTop: 'jacket-4'});
            this.setState({clothesBottom: 'boot'});
            this.props.handleBG("coldbg");
            this.setState({accessory1: "scarf"});
            //seperate checks for specific weather conditions
            if (result.weather[0].main === "Snow") {
              this.setState({accessory2: "boot-2"});
              this.setState({accessory3: "gloves"});
            } else if(result.weather[0].main === "Rain") {
              this.setState({accessory2: "umbrella"});
              this.setState({accessory3: "boot-1"});
            } else if (result.weather[0].main === "Clouds") {
              this.setState({accessory2: "backpack"});
              this.setState({accessory3: "jacket-1"});
            } else if (result.weather[0].main === "Clear") {
              this.setState({accessory1: "jeans"});
              this.setState({accessory2: "pullover"});
              this.setState({accessory3: "hand-bag"});
            }
          }

          //hot temperature
          else if (Math.round(result.main.temp) >= 20){
            // 20 and more
            this.setState({clothesHead: 'polo'});
            this.setState({clothesTop: 'shorts'});
            this.setState({clothesBottom: 'slipper'});
            this.props.handleBG("toohot");
            //specific checks for possible variations
            if (result.weather[0].main === "Clear") {
              this.setState({accessory1: "cap"});
              this.setState({accessory2: "pamela"});
              this.setState({accessory3: "glasses"});
            }
            else if (result.weather[0].main === "Clouds") {
              this.setState({accessory1: "dress"});
              this.setState({accessory2: "cap"});
              this.setState({accessory3: "hand-bag"});
            } else if(result.weather[0].main === "Rain"){
              this.setState({accessory1: "umbrella"});
              this.setState({accessory2: "shoe"});
              this.setState({accessory3: "bathrobe"});
            }
          }
          //warm temperature, but under 20
          else if (Math.round(result.main.temp) >= 16){
            this.setState({clothesHead: "shirt"});
            this.setState({clothesTop: "jeans"});
            this.setState({clothesBottom: "dress-4"});
            this.props.handleBG("app");
            //seperate checks
            if (result.weather[0].main === "Clear") {
              this.setState({accessory1: "cap"});
              this.setState({accessory2: "skirt"});
              this.setState({accessory3: "glases"});
            }
            else if (result.weather[0].main === "Clouds") {
              this.setState({accessory1: "jacket"});
              this.setState({accessory2: "pants"});
              this.setState({accessory3: "backpack"});
            } else if(result.weather[0].main === "Rain"){
              this.setState({accessory1: "umbrella"});
              this.setState({accessory2: "backpack"});
              this.setState({accessory3: "sneaker"});
            }
          }
          // cold temperatures
          else if (Math.round(result.main.temp) >= 5){
            this.setState({clothesHead: "jacket-3"});
            this.setState({clothesTop: "jeans"});
            this.setState({clothesBottom: "sneaker"});
            this.props.handleBG("app");
            //seperate checks
            if(result.weather[0].main === "Rain"){
              this.setState({accessory1: "umbrella"});
              this.setState({accessory2: "boot-1"});
              this.setState({accessory3: "trench-coat"});
            } else if (result.weather[0].main === "Clear") {
              this.setState({accessory1: "backpack"});
              this.setState({accessory2: "jacket"});
              this.setState({accessory3: "hand-bag"});
            } else if (result.weather[0].main === "Snow") {
              this.setState({accessory2: "boot-2"});
              this.setState({accessory3: "gloves"});
              this.setState({accessory1: "scarf"});
            } else if (result.weather[0].main === "Clouds") {
              this.setState({accessory1: "scarf"});
              this.setState({accessory2: "winter-hat"});
              this.setState({accessory3: "pullover"});
            }
          }
          
          else {
            // 0 - 15
            this.setState({clothesHead: 'hat'});
            this.setState({clothesTop: 'jacket-4'});
            this.setState({clothesBottom: 'pants'});
            console.log('no conditions met');
          }
        

        } else {
          console.log('No found location');
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
          {this.state.navbar ? <Navbar/> : null }
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
