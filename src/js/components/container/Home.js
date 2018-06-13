import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../presentational/homeHeader';
import { SearchBar } from '../presentational/homeSearch';

export class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchQuery: '',
			quantityToDisplay: '',
		};

		this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
		this.formatTruckResults = this.formatTruckResults.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
	}

	handleOnKeyUp(e){
		this.setState({
			searchQuery: e.target.value
		},  result => {this.props.truckSearch(this.state.searchQuery)});
	}

	handleSelectChange(e){
		this.setState({
			quantityToDisplay: e.target.value
		});
	}

	formatTruckResults(){
		//Determine which data to load
		let trucksArray = this.props.truckResults;
		switch(this.state.quantityToDisplay){
			case '10':
				trucksArray = trucksArray.length == 0? this.props.truckData.slice(0, 10) : trucksArray.slice(0, 10);
				break;
			case '25':
				trucksArray = trucksArray.length == 0? this.props.truckData.slice(0, 25) : trucksArray.slice(0, 25);
				break;
			case '50':
				trucksArray = trucksArray = trucksArray.length == 0? this.props.truckData.slice(0, 50) : trucksArray.slice(0, 50);
				break;
			default:
				trucksArray = this.props.truckData;
		}

		trucksArray.sort((a,b) => {
			if (a.applicant < b.applicant) {
			   return -1;
			 }
			 else if (a.applicant > b.applicant) {
			   return 1;
			 }
			 return 0;
		});

		const formattedTrucks = trucksArray.map( truck => {
			return(
				<li key={truck.objectid}>
					<Link to={{
						pathname:`${this.props.match.url}${truck.applicant}`, 
						state: { truck }
					}}>
						{truck.applicant}<br/>
						{truck.address}
					</Link>
				</li>
			);
		});

		return formattedTrucks;
	}

	render(){
		let formattedTruckResults = this.formatTruckResults();

		return(
			<div>
				<Header />
				<SearchBar onKeyUp={this.handleOnKeyUp} truckResults={formattedTruckResults} selectChange={this.handleSelectChange} />
			</div>
		);
	}
} 