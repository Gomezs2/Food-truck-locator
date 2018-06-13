import React from 'react';

export const SearchBar = props => {
	return(
		<div>
			<input type="text" onKeyUp={props.onKeyUp}/>
			<select onChange={props.selectChange}>
				<option value='0'>All</option>
				<option value='10'>10</option>
				<option value='25'>25</option>
				<option value='50'>50</option>
			</select>
			<ul>
				{props.truckResults}
			</ul>
		</div>
	);
}