import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { Home } from './Home';
import { TruckView } from '../presentational/truckView';

export class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			truckData: [],
			trucksToRender: []
		};

		this.populateTrucksToRender = this.populateTrucksToRender.bind(this);
	}

	componentDidMount(){
		const endPoint = "https://data.sfgov.org/resource/6a9r-agq8?status=APPROVED";
		fetch(endPoint).then( response => {
			if(response.ok){
				return response.json();
			}
			throw new Error('Network is currently down');
		}).then(jsonData => {
			this.setState({
				truckData: jsonData
			});
		});
	}

	populateTrucksToRender(queryString){
		const filteredTrucks = this.state.truckData.filter(truck => {
			return truck.applicant.toLowerCase().startsWith(queryString.toLowerCase()) || 
				truck.address.toLowerCase().startsWith(queryString.toLowerCase()) ||
				this.containsFoodItem(truck.fooditems , queryString)
		});

		this.setState({
			trucksToRender: filteredTrucks
		});
	}

	containsFoodItem(fooditems, queryString){
		if(fooditems){
			let formattedFoodItems = fooditems.split(': ').map(foodItem => foodItem.toLowerCase());
			return formattedFoodItems.includes(queryString.toLowerCase());
		}

		return false;
	}

	render(){
		return(  
			<main>
				<Switch>
      				<Route exact path='/' 
      					render={ ({match}) => <Home truckData={this.state.truckData} truckSearch={this.populateTrucksToRender} truckResults={this.state.trucksToRender} match={match}/>} />
      				<Route path={`/:truck`}
      					component={TruckView} />
      				<Route path='*' render={() => <h1>Not found</h1>} />
      			</Switch>
  			</main>
		);
	}

}