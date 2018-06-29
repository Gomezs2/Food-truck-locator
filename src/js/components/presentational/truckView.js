import React from 'react';
import {SimpleMap} from './TruckMap';

export const TruckView = props => {
    let foodItems = [];
    if(props.location.state.truck.fooditems){
        foodItems = props.location.state.truck.fooditems.split(': ').map(foodItem =><h5 key={foodItem} className="list-inline-item"><span className="badge badge-info">{foodItem.toLowerCase()}</span></h5>);
    }

    const truckCoord = {
        lat: Number(parseFloat(props.location.state.truck.latitude).toFixed(4)),
        lng: Number(parseFloat(props.location.state.truck.longitude).toFixed(4))
    };

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
                <SimpleMap center={truckCoord} zoom={16} />
            </div>
        </div>
    );
}