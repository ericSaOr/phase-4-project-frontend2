import { BrowserRouter, Link } from 'react-router-dom';
import Login from './Login';

function Header({ user, onLogout, reviews }) {
	function handleLogout(e) {
		e.preventDefault();
		fetch('/logout', {
			method: 'DELETE'
		}).then(() => onLogout());
	}

function listItems() {
		return reviews.map((r) => 
    <div>     
      <p> {r.note} </p>
    </div>
    );}
	console.log(listItems());


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
							  {listItems()}
					</div>
				) : (
					<Link to="/login">Click Here to Login</Link>
				)}
			</BrowserRouter>
		</header>
	);
}

export default Header;
