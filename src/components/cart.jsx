import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
// import PropTypes from 'prop-types';

Cart.propTypes = {

};

function Cart({ productList }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  let count = 0;
  const [product, setProduct] = useState(productList);

  product.forEach(product => {
    if (product.quantityCart > 0) {
      count++;
    }
  });
  const removeCart = (itemId) => {
    setProduct(prevList =>
      prevList.map(item => {
        if (item.id === itemId) {
          item.quantityCart = 0;
        }
        return item;
      }

      )
    );
  };
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Money</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {count > 0 ? (
            product.map((item) =>
              item.quantityCart > 0 ? (
                <tr key={item.id}>
                  <th scope="row">{item.name}</th>
                  <td>{item.quantityCart}</td>
                  <td>{formatVND(item.price)}</td>
                  <td>{formatVND(item.quantityCart * item.price)}</td>
                  <td><button style={{ color: "white", backgroundColor: "#D30000", borderRadius: "10px", border: "none", padding: "3px 10px" }} onClick={() => removeCart(item.id)}>Delete</button></td>
                </tr>
              ) : (
                null
              )
            )) : (
            <tr>
              <td colSpan={5}>No products in Cart.</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Total: {calculateTotal(product)}</h3>
      <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: 'center' }}>
        <a href="/check-order" onClick={(e) => { e.preventDefault(); handleNavigation('/check-order'); }}><Button variant="contained">Check-out</Button></a>
      </Stack>
    </div>
  );
}

const calculateTotal = (cartItems) => {
  return formatVND(cartItems.reduce((total, item) => total + item.price * item.quantityCart, 0));
};

function formatVND(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VND';
}

export default Cart;