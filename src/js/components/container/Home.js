import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../presentational/Header';
import { SearchBar } from '../presentational/SearchBar';

export class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchQuery: '',
			quantityToDisplay: Number.MAX_SAFE_INTEGER
		};

		this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
		this.formatTruckResults = this.formatTruckResults.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.searchQuery != this.state.searchQuery){
			this.props.truckSearch(this.state.searchQuery);
		}
	}

	handleOnKeyUp(e){
		this.setState({
			searchQuery: e.target.value
		});
	}

	handleSelectChange(e){
		this.setState({
			quantityToDisplay: Number(e.target.value)
		});
	}

	handleCheckboxChange(e){
		this.props.handleCheckboxChange(this.state.searchQuery);
	}

	formatTruckResults(){
		let trucksArray = this.props.truckResults;
		const displayAmount = this.state.quantityToDisplay;

		if(displayAmount != 0 ){
			trucksArray = trucksArray.slice(0, displayAmount);
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
				<SearchBar onKeyUp={this.handleOnKeyUp} truckResults={formattedTruckResults} selectChange={this.handleSelectChange} checkboxChange={this.handleCheckboxChange}/>
				<ul>
					{formattedTruckResults}
				</ul>
			</div>
		);
	}
} 