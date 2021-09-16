import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
// import { Switch, Route } from "react-router-dom";

function App() {
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		fetch('/me').then((response) => {
			if (response.ok) {
				response.json().then((user) => setUser(user));
			}
		});
	}, []);

	if (user) {
		return <h2>Welcome, {user.username}!</h2>;
	} else {
		return (
    <>
    <Login onLogin={setUser} /> 
    <Navbar />;
    </>
    )
	}
}

export default App;
