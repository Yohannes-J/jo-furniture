import React, { useContext } from 'react';
import "./LuxryItem.css";
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/Context';

const LuxryItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const isItemInCart = cartItems[id] !== undefined;

  return (
    <div className='luxry-item'>
      <div className='luxry-item-img-container'>
        <img className='luxry-item-image' src={url + "/images/" + image} alt={name} />
        {!isItemInCart ? (
          <button
            className='add'
            onClick={() => addToCart(id)}
            aria-label="Add to cart"
          >
            ORDER
          </button>
        ) : (
          <div className='luxry-item-counter'>
            <button
              onClick={() => removeFromCart(id)}
              aria-label="Remove from cart"
            >
              Remove from Cart
            </button>
            <p>{cartItems[id]}</p>
            <button
              onClick={() => addToCart(id)}
              aria-label="Add to cart"
            >
              add to cart
            </button>
          </div>
        )}
      </div>
      <div className='luxry-item-info'>
        <div className='luxry-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt='Rating stars' />
        </div>
        <p className='luxry-item-desc'>{description}</p>
        <p className='luxry-item-price'>{price} Birr</p>
      </div>
    </div>
  );
};

export default LuxryItem;
