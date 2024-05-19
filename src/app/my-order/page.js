"use client"
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import fetchData from "../../services/OrderService"; 

export default function MyOrder() {
    const [orderList, setOrderList] = useState([]); 
    const [selectedOrder, setSelectedOrder] = useState(null); 

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchData(userId).then(data => {
                setOrderList(data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, []);

    const handleShowOrderDetails = (order) => {
        setSelectedOrder(order === selectedOrder ? null : order); 
    };

    return (
        <main className={styles.main}>
            <div className={styles.mainBox}>
                <div className={styles.container}>
                    <h2 className={styles.mainText}>Beställningslista</h2>
                    <div className={styles.orderList}>
                        {orderList.map((order, index) => (
                            <div key={index} className={styles.order}>
                                <p className={styles.date}>Orderdatum: {order.date}</p>
                                <p className={styles.amountOfProducts}>Antal produkter: {order.quantity}</p>
                                <p className={styles.amount}>Belopp: {order.amount} kr</p>
                                <button className={styles.showMore} onClick={() => handleShowOrderDetails(order)}>
                                    {selectedOrder === order ? "Dölj detaljer" : "Visa hela ordern"}
                                </button>
                                {selectedOrder === order && (
                                    <div className={styles.orderDetails}>
                                        <h3>Orderdetaljer</h3>
                                        <h4>Produkter:</h4>
                                        <ul>
                                            {order.orderProduct.map((product, idx) => (
                                                <li key={idx}>
                                                    Produkt {product.product.name}, Pris: {product.product.price}:-,  Antal: {product.quantity}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
