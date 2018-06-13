import React from 'react';

export const TruckView = props => {
	let foodItems = [];

	if(props.location.state.truck.fooditems){
		foodItems = props.location.state.truck.fooditems.split(': ').map(foodItem => <li key={foodItem}>{foodItem}</li>);
	}

	return(
		<div>
    		<h1>{props.location.state.truck.applicant}</h1>
    		<h3>{props.location.state.truck.address}</h3>
    		<b>Open:</b> {props.location.state.truck.dayshours} <br/><br/>
    		<b>Offers:</b> <br/>
    		<ul>
    			{foodItems}
    		</ul>
  		</div>
	);
}