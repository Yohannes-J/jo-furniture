import React, { useContext, useEffect, useState, useCallback } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../components/context/Context';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    // Function to fetch orders
    const fetchOrders = useCallback(async () => {
        if (token) {
            try {
                const response = await axios.post(`${url}/api/order/userorders`, {}, {
                    headers: { token }
                });
                setData(response.data.data || []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    }, [url, token]);

    // Fetch orders on component mount
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Function to remove an entire order
    const removeOrder = async (orderId) => {
        try {
            const response = await axios.delete(`${url}/api/order/removeOrder`, {
                headers: { token },
                params: { orderId }
            });

            if (response.data.success) {
                // Refresh orders after removal
                fetchOrders();
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error removing order:', error);
        }
    };

    return (
        <div className='my-orders'>
            <h2 className='myordersp'>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="Parcel icon" />
                            <p>
                                {order.items.map((item, itemIndex) => (
                                    <span key={itemIndex}>
                                        {item.name} x {item.quantity}
                                        {itemIndex < order.items.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={() => removeOrder(order._id)}>Remove Order</button>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;
