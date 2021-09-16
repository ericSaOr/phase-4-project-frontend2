import React from 'react';
function Home({ reviews }) {
	// const [ reviews, setReviews ] = useState([]);
	// useEffect(() => {
	// 	fetch('/reviews').then((r) => r.json()).then(setReviews);
	// }, []);
	function reviewMap() {
		return reviews.map((review) => {
			return (
				<h2>
					User: {review.username.id} Review: {review.note}
				</h2>
			);
		});
	}

	return <div>{reviewMap()}</div>;
}

export default Home;
