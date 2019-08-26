import React from "react";
import "./App.css";
import Demo from "./Demo";
import SimpleDemo from "./SimpleDemo";

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const Notfound = () => <h1>404 Not found</h1>

const App = () => {
	return (
		<div className="App">
			<Router basename="/">
				<Switch>
					<Route exact path="/" component={Demo} />
					<Route exact path="/frame" component={SimpleDemo} />
					<Route component={Notfound} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
