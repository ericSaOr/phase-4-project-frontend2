import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

function App() {
	const [ user, setUser ] = useState(null);
	const [ reviews, setReviews ] = useState([]);

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

	useEffect(() => {
		fetch('/reviews').then((response) => {
			response.json().then((review) => setReviews(review));
		});
	}, []);

	console.log(reviews);

	//   const listItems = reviews.map((r) => <li key={r.id}>{r.note}</li>);
	return (
		<div className="App">
			{/* <div>{listItems}</div> */}
			<Header user={user} onLogout={handleLogout} 
      reviews={reviews}/>
			<BrowserRouter>
				<Switch>
					<Route exact path="/login">
						<Login onLogin={handleLogin} review={reviews} />
					</Route>
					<Route exact path="/">
						<Home reviews={reviews} />
					</Route>
					<Route exact path="/reviews">
						
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
