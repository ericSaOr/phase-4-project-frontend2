import React from 'react';
function Home({ reviews }) {
	// const [ reviews, setReviews ] = useState([]);
	// useEffect(() => {
	// 	fetch('/reviews').then((r) => r.json()).then(setReviews);
	// }, []);

	const listItems = reviews.map((r) => <li key={r.id}>{r.note}</li>);
	console.log(listItems);
	return <div>{listItems}</div>;
}

export default Home;
