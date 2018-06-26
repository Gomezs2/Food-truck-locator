import React from 'react';

export const TruckView = props => {
	let foodItems = [];
	if(props.location.state.truck.fooditems){
		foodItems = props.location.state.truck.fooditems.split(': ').map(foodItem => <button key={foodItem} className="btn btn-outline-info list-inline-item">{foodItem.toLowerCase()}</button>);
	}
    
	return(
		<div className='container truck-view'>
            <div className='row justify-content-center'>        
                <h1>{props.location.state.truck.applicant}</h1>
            </div>
            <div className='row justify-content-center'>
                <h3>{props.location.state.truck.address}</h3>
            </div>
            <div className='row justify-content-center'>
                <h4>{props.location.state.truck.dayshours}</h4>
            </div>
            <div className='row offer-row'>
                <div className='col-12'>
                    <h5>Serves:</h5>
                    <ul className='list-inline'>
                        {foodItems}
                    </ul>
                </div>
            </div>
            <div className='row justify-content-center'>

            </div>
        </div>
	);
}