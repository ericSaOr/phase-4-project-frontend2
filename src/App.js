import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		fetch('/me').then((response) => {
			if (response.ok) {
				response.json().then((user) => setUser(user));
			}
		});
	}, []);

	function handleLogin(user) {
		setUser(user);
	}

	function handleLogout() {
		setUser(null);
	}

	return (
		<div className="App">
			<Header user={user} onLogout={handleLogout} />
			<BrowserRouter>
				<Switch>
					<Route exact path="/login">
						<Login onLogin={handleLogin} />
					</Route>
					<Route exact path="/">
						<Home />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
