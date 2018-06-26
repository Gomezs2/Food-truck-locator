import React from 'react';
import '../../../css/styles.scss';

export const TruckList = props => {
	return(
		<div className='container'>
			<div className='row justify-content-center'>
				<ul className='list-group w-75 p-3'>
					{props.children}
				</ul>
			</div>
		</div>
	);
}