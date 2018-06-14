import React from 'react';
import { Route, Switch} from 'react-router-dom';
import { Home } from './Home';
import { TruckView } from '../presentational/TruckView';

export class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			truckData: [],
			trucksToRender: [],
			trucksOpen: [],
			findOpenTrucks: false 
		};

		this.populateTrucksToRender = this.populateTrucksToRender.bind(this);
		this.populateTrucksOpen = this.populateTrucksOpen.bind(this);
		this.isOpen = this.isOpen.bind(this);
		this.checkDay = this.checkDay.bind(this);
		this.checkHour = this.checkHour.bind(this);
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
		const truckData = this.state.findOpenTrucks? this.state.trucksOpen: this.state.truckData;
		const filteredTrucks = truckData.filter(truck => {
			return truck.applicant.toLowerCase().startsWith(queryString.toLowerCase()) || 
				truck.address.toLowerCase().startsWith(queryString.toLowerCase()) ||
				this.containsFoodItem(truck.fooditems , queryString)
		});

		this.setState({
			trucksToRender: filteredTrucks
		});
	}

	populateTrucksOpen(queryString){
		const currentDate = new Date();
		const userDay = currentDate.getDay() == 0? 7 : currentDate.getDay();
		const userHour = currentDate.getHours(); 
		const openTrucks = this.state.truckData.filter(truck => {
			return this.isOpen(truck.dayshours, userDay, userHour);
		});

		this.setState({
			trucksOpen: openTrucks,
			findOpenTrucks: !this.state.findOpenTrucks
		}, result => {this.populateTrucksToRender(queryString)});
	}

	isOpen(truckHours, userDay, userHour){
		if(truckHours){
			const [availableDays, availableHours] = truckHours.split(':');
			if(this.checkDay(availableDays, userDay) && this.checkHour(availableHours, userHour)){
				return true;
			}
			return false;
		}
	}

	checkHour(availableHours, userHour){
		let [startTime, endTime] = availableHours.split('-');
		if( userHour >= this.extractTime(startTime) && userHour <= (this.extractTime(endTime) + 12)){
			return true;
		}
		return false;
	}

	extractTime(formattedTime){
		let time = 0;
		for(let i = 0; i < formattedTime.length; ++i){
			if(!isNaN(formattedTime.charAt(i))){
				time += formattedTime.charAt(i);
			}
		}
		return Number(time);
	}

	checkDay(availableDays, userDay){
		//Handles Mu-Fr format
		if(availableDays.includes('-')){
			const [startDay, endDay] = availableDays.split('-');
			if( userDay >= this.convertDay(startDay) && userDay <= this.convertDay(endDay)){
				return true;
			}
			return false;
		}

		//Handles Mu/We/Sa format
		const daysOpen = availableDays.split('/').map(day => this.convertDay(day));
		if(daysOpen.includes(userDay)){
			return true;
		}
		return false;
	}

	convertDay(day){
		switch(day){
			case 'Mo':
				return 1;
			case 'Tu':
				return 2;
			case 'We':
				return 3;
			case 'Th':
				return 4;
			case 'Fr':
				return 5;
			case 'Sa':
				return 6;
			case 'Su':
				return 7;
		}
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
      					render={({match}) => <Home truckData={this.state.truckData} truckSearch={this.populateTrucksToRender} truckResults={this.state.trucksToRender} match={match} getOpenTrucks={this.populateTrucksOpen} /> }/>
      				<Route path={`/:truck`}
      					component={TruckView} />
      				<Route path='*' render={() => <h1>Not found</h1>} />
      			</Switch>
  			</main>
		);
	}

}