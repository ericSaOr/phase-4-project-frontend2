import { BrowserRouter, Link } from 'react-router-dom';
import Login from './Login';
import React, { useState, useEffect } from 'react';

function Header({ user, onLogout, reviews, setReviews }) {
	const [ review, setReview ] = useState('');
	const [ isEditing, setIsEditing ] = useState(false);

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
				<button onClick={() => handleDelete(r.id)}>DELETE</button>
				<button onClick={() => potato()}>EDIT</button>
			</div>
		));
	}

	function handleDelete(id) {
		fetch(`/reviews/${id}`, {
			method: 'DELETE'
		})
			.then((r) => r.json())
			.then((deletedReview) => {
				setReviews((prevReviews) => {
					const copyReviews = [ ...prevReviews ];
					const index = copyReviews.findIndex((review) => deletedReview.id === review.id);
					console.log('INDEX FROM DELETE REQUEST', index);
					copyReviews.splice(index, 1);
					return copyReviews;
				});
			});
	}

	const handleChangeName = (review) => {
		setReview(review.target.value);
	};

	function handleSubmit(e) {
		e.preventDefault();
		fetch('/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ note: review })
		})
			.then((response) => response.json())
			.then((rData) => setReviews((review) => [ ...review, rData ]));
	}

	function handlePost(e) {
		e.preventDefault();
		fetch('/reviews', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				note: review
			})
		})
			.then((response) => response.json())
			.then((updatedReview) => setReviews(updatedReview));
	}

	function handleCancel() {
		setIsEditing(false);
	}

	function potato() {
		return (
			<div>
				<form onSubmit={handlePost}>
					<input onChange={handleChangeName} type="text" name="editReview" />
					<button type="submit" value="save" onClick={handleEditClick()}>
						Submit
					</button>
					<button type="button" onClick={handleCancel}>
						Cancel
					</button>
				</form>
			</div>
		);
	}

	function handleEditClick(review) {
		setIsEditing(!isEditing);
		setReviews(review.target.value);
		return console.log('fired');
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

						<form onSubmit={handleSubmit}>
							<input onChange={handleChangeName} type="text" name="newReview" />
							<button type="submit">Submit</button>
						</form>
					</div>
				) : (
					<p>
						<Link to="/login">Click Here to Login</Link>
					</p>
				)}
			</BrowserRouter>
		</header>
	);
}

export default Header;
