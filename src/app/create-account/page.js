"use client"

import React, { useState } from 'react';
import styles from "./page.module.css";


function SetLoginAfterCreate(userId) {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userId', userId.id);
}

export default function CreateAccount() {
    const [userInformation, setUserInformation] = useState({ 
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
        setUserInformation({ ...userInformation, [id]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('https://localhost:7294/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInformation)
            });

            if (response.ok) {
                const id = await response.json();
                SetLoginAfterCreate(id);
                console.log('Användarinformation sparad framgångsrikt!');
                
                window.location.reload();
            } else {
                console.error('Något gick fel vid sparande av användarinformation.');
            }
        } catch (error) {
            console.error('Något gick fel:', error);
        }
    };



    return (
        <main className={styles.main}>
            <h2>Skapa konto</h2>
            <div className={styles.accountDetails}>
                <div className={styles.field}>
                    <label htmlFor="firstName">Ange förnamn:</label>
                    <input type="text" id="firstName" value={userInformation.firstName} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="lastName">Ange efternamn:</label>
                    <input type="text" id="lastName" value={userInformation.lastName} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="personalNumber">Ange personnummer:</label>
                    <input type="text" id="personalNumber" value={userInformation.personalNumber} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">Ange e-post:</label>
                    <input type="email" id="email" value={userInformation.email} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="address">Ange adress:</label>
                    <input type="text" id="address" value={userInformation.address} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="postalCode">Ange postnummer:</label>
                    <input type="text" id="postalCode" value={userInformation.postalCode} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="city">Ange postort:</label>
                    <input type="text" id="city" value={userInformation.city} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ange lösenord:</label>
                    <input type="password" id="password" value={userInformation.password} onChange={handleInputChange}/>
                </div>
                <button className={styles.saveChangeButton} onClick={handleSaveChanges}>Skapa konto</button>
            </div>
        </main>
    );
}
