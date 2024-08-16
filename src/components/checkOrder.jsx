import React from 'react';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button'

function CheckOrder({ productList }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Check out Information</h2>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <form>
              <div class="form-group" style={{ marginBottom: '20px' }}>
                <TextField id="outlined-basic" label="Your Name" variant="outlined" sx={{ width: '90%' }} />
              </div>
              <div class="form-group" style={{ marginBottom: '20px' }}>
                <TextField id="outlined-basic" label="Your Phone Number" variant="outlined" sx={{ width: '90%' }} />
              </div>
              <div class="form-group" style={{ marginBottom: '20px' }}>
                <TextField id="outlined-basic" label="Your Address" variant="outlined" sx={{ width: '90%' }} />
              </div>
              <button type="submit" class="btn btn-primary" onClick={(e) => { submitBtn(productList); handleNavigation('/') }}>Submit</button>
            </form>
          </Grid>
          <Grid item xs={4}>
            <div className="cart">
              <h2>List Items</h2>

              {
                productList.map((item) =>
                  item.quantityCart > 0 ? (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p>{item.name} x {item.quantityCart}</p>
                      <p>{formatVND(item.quantityCart * item.price)}</p>
                    </div>
                  ) : (
                    null
                  )
                )}
              <h3>Total: {calculateTotal(productList)}</h3>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
const calculateTotal = (cartItems) => {
  return formatVND(cartItems.reduce((total, item) => total + item.price * item.quantityCart, 0));
};
function formatVND(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' VND';
}

function submitBtn(list) {
  alert("Check out successfully! Your order is on the way!")
  list.forEach(product => {
    product.quantityCart = 0
  });
}

export default CheckOrder;