"use client"
import styles from "./page.module.css";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function SetLoginAfterLogin(userId) {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userId', userId.id);
}

export default function Login() {

    const router = useRouter();

    const [inputUserData, setinputUserData] = useState({ 
        email: "",
        password: ""
    });

    const [error, setError] = useState();

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setinputUserData({ ...inputUserData, [id]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch('https://localhost:7294/api/Users/Authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputUserData)
            });

            if (response.ok) {
                const id = await response.json();
                SetLoginAfterLogin(id);
                window.location.reload();
            } else {
                console.error('Något gick fel');
                setError(true);
            }
        } catch (error) {
            console.error('Något gick fel:', error);
        }
    };

    return (
        <main className={styles.main}>
            <h2>Logga in</h2>
            <div className={styles.accountDetails}>
                <div className={styles.field}>
                    <label htmlFor="email">Ange e-post:</label>
                    <input type="email" id="email" value={inputUserData.email} onChange={handleInputChange}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="password">Ange lösenord:</label>
                    <input type="password" id="password" value={inputUserData.password} onChange={handleInputChange}/>
                </div>
                {error && (
                    <div className={styles.field}>
                        <label htmlFor="password">Fel användarnamn eller lösenord</label>
                    </div>
                )}
                <button className={styles.saveChangeButton} onClick={handleSaveChanges}>Logga in</button>
            </div>
        </main>
    );
}
