"use client"
import styles from "./page.module.css";
import React, { useState, useEffect } from 'react';
import fetchData  from "../../services/Userservice.js"

export default function MyAccount() {


        const [userData, setUserData] = useState(  
        {
        firstName: "",
        lastName: "",
        personalNumber: "",
        email: "",
        address: "",
        postalCode: "",
        city: "",
        password: ""    
        });

        const handleInputChange = (event) => {
            const { id, value } = event.target;
            setUserData({ ...userData, [id]: value });
        };
    
        useEffect(() => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                fetchData(userId).then(data => {
                    setUserData(data);
                    console.log("userdata " + data)
                }).catch(error => {
                    console.error(error);
                });
            }
        }, []);



        const handleSaveChanges = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await fetch(`https://localhost:7294/api/Users/${userId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
        
                    if (response.ok) {
                        console.log('Användarinformation sparad framgångsrikt!');
                        alert('Ändringar sparade');

                    } else {
                        console.error('Något gick fel vid sparande av användarinformation.');
                    }
                } else {
                    console.error('Ingen användar-ID hittades i localStorage.');
                }
            } catch (error) {
                console.error('Något gick fel:', error);
            }
        };

        
            const [showPassword, setShowPassword] = useState(false);
            const [password, setPassword] = useState('');
          
            const handleTogglePassword = () => {
              setShowPassword(!showPassword);
            };
        

    return (
        <main className={styles.main}>
            <h2>Mitt konto</h2>
            <div className={styles.accountDetails}>
                <div className={styles.field}>
                    <label htmlFor="firstName">Förnamn:</label>
                    <input type="text" id="firstName" value={userData.firstName} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="lastName">Efternamn:</label>
                    <input type="text" id="lastName" value={userData.lastName} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="personalNumber">Personnummer:</label>
                    <input type="text" id="personalNumber" value={userData.personalNumber} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">E-post:</label>
                    <input type="email" id="email" value={userData.email} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="address">Adress:</label>
                    <input type="text" id="address" value={userData.address} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="postalCode">Postnummer:</label>
                    <input type="text" id="postalCode" value={userData.postalCode} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="city">Postort:</label>
                    <input type="text" id="city" value={userData.city} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Lösenord:</label>
                    <input type={showPassword ? 'text' : 'password'} value={userData.password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className={styles.showPasswordButton} onClick={handleTogglePassword}> {showPassword ? 'Dölj' : ' Visa'}</button>    
                </div>
                <button className={styles.saveChangeButton} onClick={handleSaveChanges}>Spara ändring</button>
            </div>
        </main>
    );
}
