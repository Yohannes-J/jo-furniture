import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from '../../components/context/Context';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, luxry_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {luxry_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.price} Birr</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]} Birr</p>
                  <p onClick={() => removeFromCart(item._id)} className='clear'>clear</p>
                </div>
                <hr />
              </div>
            );
          }
          return null; // Ensure map returns a value
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} Birr</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 50} Birr</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5} Birr</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
