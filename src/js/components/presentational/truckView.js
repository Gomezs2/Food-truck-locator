import React from 'react';

export const TruckView = ({match}) => {
	// const truck = props.truckResults.find(truck => {
	// 	return truck.applicant === 
	// });
	console.log('here');
	return(
		<div>
			<h1>{match.params}</h1>
		</div>
	);
}