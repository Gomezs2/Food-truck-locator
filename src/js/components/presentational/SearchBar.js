import React from 'react';
import '../../../css/styles.scss';

export const SearchBar = props => {
	return(
		<div className='container'>
			<div className='row justify-content-center'>
			  <div className="input-group w-75 p-3" >
			    <input type="text" className="form-control" placeholder="Food Truck's Name | Address | Dishes" onChange={props.onKeyUp} value={props.searchQuery}/>
			    <div className="input-group-append">
			    	<select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={props.selectChange}>
			    	  <option value='0'>All</option>
			    	  <option value='10'>10</option>
			    	  <option value='25'>25</option>
			    	  <option value='50'>50</option>
			    	</select>			   
			    </div>
			  </div>
			</div>
			<div className='row justify-content-center'>
				<div className="col-4">
				<label className="form-check-label float-right" >
				 	<h4><span className="badge badge-secondary open-now-span">Open Now</span></h4>
				</label>
				 </div>
				 <div className="col-4">
				   <input className="form-check-input open-now-box" type="checkbox" checked={props.isChecked} value="" id="defaultCheck1" onClick={props.checkboxChange}/>
				 </div>
			</div>
		</div>
	);
}