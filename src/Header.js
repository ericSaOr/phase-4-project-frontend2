import { BrowserRouter, Link } from 'react-router-dom';
import Login from './Login';

function Header({ user, onLogout }) {
	function handleLogout(e) {
		e.preventDefault();
		fetch('/logout', {
			method: 'DELETE'
		}).then(() => onLogout());
	}

	return (
		<header>
			<BrowserRouter>
				<h1>LOG IN PLEASE</h1>

				{user ? (
					<div>
						<p>Welcome, {user.username}!</p>
						<button onClick={handleLogout}>Logout</button>
					</div>
				) : (
					<Link to="/login">Click Here to Login</Link>
				)}
			</BrowserRouter>
		</header>
	);
}

export default Header;
