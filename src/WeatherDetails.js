import React from 'react';



class WeatherDetails extends React.Component {
  constructor(props){
    super(props);
  }


  nameHandler = (e) => {
    this.setState({name: e.target.value});
  }

  render() {
    return (
    <div className="weatherDisplay">
        <div className="info-box">
            <div className="location">{this.props.locationFullName}</div>
            <div className="temp">{this.props.temp}</div>
            <div className="cond">{this.props.condition}</div>
            <br/>
        </div>

        <br></br>

        <div className="row">
        <div className="col-6">
            <p>What should you wear today?</p>

            <div className="clothes-box clothesHead">
            <img src={process.env.PUBLIC_URL + 'clothes/'+this.props.clothesHead+'.png'}></img>
            </div>
            <div className="clothes-box clothesTop">
            <img src={process.env.PUBLIC_URL + 'clothes/'+this.props.clothesTop+'.png'}></img>
            </div>
            <div className="clothes-box clothesBottom">
            <img src={process.env.PUBLIC_URL + 'clothes/'+this.props.clothesBottom+'.png'}></img>
            </div>
        </div>

        <div className="col-6 accessory">
            <p>Recommended accessories</p>
            <img src={process.env.PUBLIC_URL + 'clothes/'+this.props.accessory1+'.png'}></img><br></br>
            <img src={process.env.PUBLIC_URL + 'clothes/'+this.props.accessory2+'.png'}></img><br></br>
            <img src={process.env.PUBLIC_URL + 'clothes/'+this.props.accessory3+'.png'}></img>
        </div>
        </div>
        <br></br>
        <div className="showMore">
            <button className="btn btn-secondary" location={this.props.locationFullName} onClick={this.props.handleShowMore}>More details</button>
        </div>
    </div>

    );
  }
}

export default WeatherDetails;