"use client"
import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import fetchProducts from "../../services/ProductService"; 
import fetchUsers from "../../services/UserAdminService"; 
import fetchOrders from "../../services/OrderAdminService"; 


export default function Admin() {
    const [productInStock, setproductInStock] = useState([]);
    const [userList, setUserList] = useState([]); // State för användarinformation
    const [OrderList, setOrderList] = useState([]); // State för användarinformation
    const [create, setCreate] = useState();
    const [createUser, setCreateUser] = useState(); // State för att visa/skjuta ny användarskaparvy

    useEffect(() => {
        // Hämta produkter vid första renderingen
        fetchProducts().then(data => {
            setproductInStock(data);
        }).catch(error => {
            console.error(error);
        });
        // Hämta användare vid första renderingen
        fetchUsers().then(data => {
            setUserList(data);
        }).catch(error => {
            console.error(error);
        });
        // Hämta ordrar vid första renderingen
        fetchOrders().then(data => {
          setOrderList(data);
      }).catch(error => {
          console.error(error);
      });
    }, []);

    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`https://localhost:7294/api/Products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Uppdatera produkter efter borttagning
            const updatedProducts = productInStock.filter(product => product.id !== productId);
            setproductInStock(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const [inputProductData, setinputProductData] = useState({ 
      name: "",
         price: "",
         ean: "",
         inventoryBalance: ""   
     });
     
       const handleInputProductDataChange = (event) => {
         const { id, value } = event.target;
         setinputProductData({ ...inputProductData, [id]: value });
     };

    const handleCreateNewProduct = async () => {
      try {
        await fetch(`https://localhost:7294/api/Products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputProductData)
        });
          // Uppdatera produkter efter att en ny produkt har lagts till
          fetchProducts().then(data => {
              setproductInStock(data);
          }).catch(error => {
              console.error(error);
          });
      } catch (error) {
          console.error('Error adding product:', error);
      }
      setinputProductData({
          name: "",
          price: "",
          ean: "",
          inventoryBalance: ""
      });
      setCreate(false);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await fetch(`https://localhost:7294/api/Users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Uppdatera användare efter borttagning
            const updatedUsers = userList.filter(user => user.id !== userId);
            setUserList(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const [inputUserData, setinputUserData] = useState({
      "password": "",
      "email": "",
      "firstName": "",
      "lastName": "",
      "address": "",
      "city": "",
      "postalCode": "",
      "personalNumber": ""
    });
     
       const handleInputUserDataChange = (event) => {
         const { id, value } = event.target;
         setinputUserData({ ...inputUserData, [id]: value });
     };

    const handleCreateNewUser = async () => {
      console.log(inputUserData);
        // Implementera logik för att skapa en ny användare
        try {
          await fetch(`https://localhost:7294/api/Users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputUserData)
        });
          // Uppdatera produkter efter att en ny produkt har lagts till
          fetchUsers().then(data => {
            setUserList(data);
          }).catch(error => {
              console.error(error);
          });
        } catch (error) {
            console.error('Error adding user:', error);
        }
        setCreateUser(false);
    };

    const handleDeleteOrders = async (orderId) => {
      try {
          await fetch(`https://localhost:7294/api/Order/${orderId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          // Uppdatera användare efter borttagning
          const updatedOrders = OrderList.filter(order => order.id !== orderId);
          setOrderList(updatedOrders);
      } catch (error) {
          console.error('Error deleting user:', error);
      }
  };

    return (
      <div>
      <h1 className={styles.header}>Admin</h1>
        <div className={styles.adminMain}>
            <div className={styles.changeBox}>
                <h3>Hantera användare</h3>
                <ul>
                    {userList.map(user => (
                        <li key={user.id}>
                            <span className={styles.userName}>{user.email}</span>
                            <button onClick={() => handleDeleteUser(user.id)}>Radera</button>
                        </li>
                    ))}
                </ul>
                {!createUser && (
                    <button className={styles.createButton} onClick={() => setCreateUser(true)}>Skapa ny användare</button>
                )}
                {createUser && (
                    <div>
                <div className={styles.field}>
                    <label htmlFor="firstName">Ange förnamn:</label>
                    <input type="text" id="firstName" value={inputUserData.firstName} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="lastName">Ange efternamn:</label>
                    <input type="text" id="lastName" value={inputUserData.lastName} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="personalNumber">Ange personnummer:</label>
                    <input type="text" id="personalNumber" value={inputUserData.personalNumber} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">Ange e-post:</label>
                    <input type="email" id="email" value={inputUserData.email} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="address">Ange adress:</label>
                    <input type="text" id="address" value={inputUserData.address} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="postalCode">Ange postnummer:</label>
                    <input type="text" id="postalCode" value={inputUserData.postalCode} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="city">Ange postort:</label>
                    <input type="text" id="city" value={inputUserData.city} onChange={handleInputUserDataChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ange lösenord:</label>
                    <input type="password" id="password" value={inputUserData.password} onChange={handleInputUserDataChange}/>
                </div>
                        <button className={styles.createButton} onClick={() => handleCreateNewUser()}>Skapa ny användare</button>
                    </div>
                )}
            </div>

            <div className={styles.changeBox}>
                <h3>Hantera produkter</h3>
                <ul>
                    {productInStock.map(product => (
                        <li key={product.id}>
                            <span className={styles.productName}>{product.name}:</span>
                            <span className={styles.productName}>  {product.ean}:</span>
                            <span className={styles.productName}>  {product.inventoryBalance}st</span>
                            <button onClick={() => handleDeleteProduct(product.id)}>Radera</button>
                        </li>
                    ))}
                </ul>
                {!create && (
                    <button className={styles.createButton} onClick={() => setCreate(true)}>Skapa ny produkt</button>
                )}
                {create && (
                    <div>
                        <div className={styles.field}>
                            <label htmlFor="text">Ange produktnamn:</label>
                            <input type="text" id="name" value={inputProductData.name} onChange={handleInputProductDataChange}/>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="number">Ange Pris:</label>
                            <input type="number" id="price" value={inputProductData.price} onChange={handleInputProductDataChange}/>
                        </div> 
                        <div className={styles.field}>
                            <label htmlFor="number">Ange Ean-kod:</label>
                            <input type="number" id="ean" value={inputProductData.ean} onChange={handleInputProductDataChange}/>
                        </div> 
                        <div className={styles.field}>
                            <label htmlFor="number">Ange Antal i lager:</label>
                            <input type="number" id="inventoryBalance" value={inputProductData.inventoryBalance} onChange={handleInputProductDataChange}/>
                        </div>                     
                        <button className={styles.createButton}onClick={() => handleCreateNewProduct()}>Skapa ny produkt</button>                
                    </div>
                )}
            </div>

            <div className={styles.changeBox}>
                <h3>Hantera Köp</h3>
                <ul>
                    {OrderList.map(order => (
                        <li key={order.id}>
                            <span className={styles.productName}>ID:{order.id}:</span>
                            <span className={styles.productName}>  {order.date}</span>
                            <button onClick={() => handleDeleteOrders(order.id)}>Radera</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        </div>
    );
}
