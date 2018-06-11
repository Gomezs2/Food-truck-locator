import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {App} from './js/components/container/App';

ReactDOM.render(
	<Router>
		<Route exact path="/" component={App} />
	</Router>,
	document.getElementById('root')
);