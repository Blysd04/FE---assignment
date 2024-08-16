import React from 'react';
// import PropTypes from 'prop-types';

Product.propTypes = {

};

function Product({ products, onAddToCart, user }) {
  return (
    <div className="col-md-3 col-xs-3 col-sm-3 col-lg-3" style={{ marginTop: "30px", marginBottom: "50px" }}>
      <div className="thumbnail">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img class="img-fluid" src={products.image} style={{ height: "420px", overflowWrap: "anywhere", objectFit: "contain", border: "2px solid #E8E8E8" }} />
        <div className="caption">
          <h3 style={{ height: "70px", display: "flex", justifyContent: "center", alignItems: "center" }}>{products.name}</h3>
          <p>{formatVND(products.price)}</p>
          {user.role === 'customer' && (
            <p>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <button className="btn btn-primary" onClick={() => onAddToCart(products)}>
                Add to cart
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function formatVND(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VND';
}

export default Product;