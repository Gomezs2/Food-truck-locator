import React from 'react';

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