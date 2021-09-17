import { BrowserRouter, Link } from 'react-router-dom';
import Login from './Login';
import React, { useState, useEffect } from 'react';

function Header({ user, onLogout, reviews }) {
	const [ review, setReview ] = useState('');

	function handleLogout(e) {
		e.preventDefault();
		fetch('/logout', {
			method: 'DELETE'
		}).then(() => onLogout());
	}

	function listItems() {
		return reviews.map((r) => (
			<div>
				<p> {r.note} </p>
			</div>
		));
	}

	const handleChangeName = (review) => {
        setReview(review.target.value)
    }


	function handleSubmit(e) {
		e.preventDefault();
		fetch('/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				review
			})
		})
			.then((response) => response.json())
			.then((rData) => setReview((review) => [ ...review, rData ]));
	}

	

	return (
		<header>
			<BrowserRouter>
				<h1>Welcome to the Bakery</h1>
				{/* Can we show the image and name for the sweet with the review or it would be kinda pointless */}

				{user ? (
					<div>
						{/* <p>Pick a Bakery Name</p> */}
						<p>Welcome, {user.username}!</p>
						<button onClick={handleLogout}>Logout</button>
						<p>Here are the reviews</p>
						{listItems(reviews)}
						<br />

						<form onSubmit={handleSubmit()}>
							<input
								onChange={handleChangeName}
								type="text"
								name="newReview"
							/>
							<button type="submit">Submit</button>
						</form>
					</div>
				) : (
					<p>Welcome!</p>
				)}
			</BrowserRouter>
		</header>
	);
}

export default Header;
