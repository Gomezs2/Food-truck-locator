import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import { Header } from '../presentational/homeHeader';
import { SearchBar } from '../presentational/homeSearch';
import { TruckView } from '../presentational/truckView';

export class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchQuery: ''
		};

		this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
		this.formatTruckResults = this.formatTruckResults.bind(this);
	}

	handleOnKeyUp(e){
		this.setState({
			searchQuery: e.target.value
		},  result => {this.props.truckSearch(this.state.searchQuery) }  );
	}

	formatTruckResults(){
		const formattedTrucks = this.props.truckResults.map( truck => {
			return(
				<li key={truck.objectid}>
					<Link to={`${this.props.match.url}${truck.applicant}`}>
						{truck.applicant}
					</Link>
				</li>
			);
		});
		return formattedTrucks;
	}

	render(){
		const formattedTruckResults = this.formatTruckResults();

		return(
			<div>
				<Header />
				<SearchBar onKeyUp={this.handleOnKeyUp} truckResults={formattedTruckResults} match={this.props.match}/>
				<Route 
					path={`localhost8080${this.props.match.path}:truckApplicant`}
					component={TruckView}
				/>
			</div>
		);
	}
} 