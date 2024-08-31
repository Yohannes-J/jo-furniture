import React, { useContext, useEffect, useState } from 'react';
import "./LuxryDisplay.css";
import { StoreContext } from '../context/Context';
import LuxryItem from '../luxryItem/LuxryItem';

const LuxryDisplay = ({ category }) => {
  const { luxry_list } = useContext(StoreContext);
  const [filteredItems, setFilteredItems] = useState([]);
  
  useEffect(() => {
    // Filter items based on category whenever category or luxry_list changes
    if (luxry_list) {
      setFilteredItems(
        luxry_list.filter(item => category === "All" || category === item.category)
      );
    }
  }, [category, luxry_list]);

  return (
    <div className='luxry-display' id='luxry-display'>
      <h2>Order The Materials From The Following Items For Your Home</h2>
      <div className='luxry-display-list'>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <LuxryItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image} 
            />
          ))
        ) : (
          <p>No items available for the selected category.</p>
        )}
      </div>
    </div>
  );
}

export default LuxryDisplay;
