import React from 'react';
import { Route, Link } from 'react-router-dom';
import { TruckView } from './truckView';

export const SearchBar = props => {
	
	return(
		<div>
			<input type="text" onKeyUp={props.onKeyUp}/>
			<ul>
				{props.truckResults}
			</ul>
		</div>
	);
}