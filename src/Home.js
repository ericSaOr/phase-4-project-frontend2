import React from 'react';
function Home ({bakeItems}) {

	function getItems() {

		return bakeItems.map((i) => 
    <div>
      
      <p> {i.item} </p>
      <img src={i.image} alt={i.item} />
    </div>

    );
	}
  console.log(getItems());

  // function showRevs() {

	// 	return reviews.map((r) => 
  //   <div>
      
  //     <p> {r.note} </p>
    
  //   </div>

  //   );
	// }
	// console.log(showRevs());

  return (
    <>
    <p>Here are our sweets!</p>
    {getItems()}
    
  </>
  )
}

export default Home;
