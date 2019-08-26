import React from "react";
import "./App.css";
import Demo from "./Demo";
import SimpleDemo from "./SimpleDemo";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Demo} />
					<Route exact path="/frame" component={SimpleDemo} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
