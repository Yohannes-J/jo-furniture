import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [luxry_list, setLuxryList] = useState([]);
  const url = "http://localhost:4000";

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newQuantity = (prev[itemId] || 0) + 1;
      const updatedCart = { ...prev, [itemId]: newQuantity };
      
      if (token) {
        axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      }
      return updatedCart;
    });
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId] > 1) {
        const updatedCart = { ...prev, [itemId]: prev[itemId] - 1 };
        
        if (token) {
          axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
        return updatedCart;
      } else {
        const { [itemId]: _, ...updatedCart } = prev; // Remove item from cart if quantity is 1
        if (token) {
          axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
        return updatedCart;
      }
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = luxry_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchLuxryList = async () => {
    const response = await axios.get(url + "/api/product/list");
    setLuxryList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchLuxryList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    luxry_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
