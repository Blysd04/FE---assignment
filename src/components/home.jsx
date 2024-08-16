import React, { useState } from 'react';
import Product from './product';
import SearchBar from './searchBar';
// import PropTypes from 'prop-types';

Home.propTypes = {

};

function Home({ productList, user }) {

  const [searchTerm, setSearchTerm] = useState("")

  const addToCart = (product) => {
    alert("Added to cart!")
    const existingItem = productList.find((item) => item.id === product.id);
    if (existingItem) {
      product.quantityCart++
    } else {
      product.quantityCart++
    }
  }

  const filterProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className='container-fluid'>
        <div className='row'>
          {filterProducts.map((product) => (
            <Product key={product.id} products={product} onAddToCart={addToCart} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;