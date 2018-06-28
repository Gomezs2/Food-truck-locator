import React from 'react';
import '../../../css/styles.scss';

export const TruckItem = props => {
	return(
		<div className='container truck-item rounded'>
			<div className='row'>
				<div className='col-12'>
					<h4 className='truck-item-title'>{props.truckInfo.applicant}</h4>
					{props.truckInfo.address}
				</div>
			</div>
			<div className='row offer-row'>
				<div className='col-12'>
					<h5>Serves:</h5>
					<ul className='list-inline'>
						{props.truckFoodItems}
					</ul>
				</div>
			</div>
		</div>
	);
}