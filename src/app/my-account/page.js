// MyAccount.js
"use client"
import styles from "./page.module.css";

export default function MyAccount() {

    const USERINFORMATION = {
        firstName: "Melker",
        lastName: "Johansson",
        personalNumber: "123456-7890",
        email: "Melker@newgen.se",
        address: "Stationsgatan 3",
        postalCode: "57774",
        city: "Målilla"
    };

    const handleSaveChanges = () => {
        // Funktion för att hantera spara ändringar
        console.log("Ändringar sparade!");
    };

    return (
        <main className={styles.main}>
            <h2>Mitt konto</h2>
            <div className={styles.accountDetails}>
                <div className={styles.field}>
                    <label htmlFor="firstName">Förnamn:</label>
                    <input type="text" id="firstName" value={USERINFORMATION.firstName}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="lastName">Efternamn:</label>
                    <input type="text" id="lastName" value={USERINFORMATION.lastName}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="personalNumber">Personnummer:</label>
                    <input type="text" id="personalNumber" value={USERINFORMATION.personalNumber}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="email">E-post:</label>
                    <input type="email" id="email" value={USERINFORMATION.email}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="address">Adress:</label>
                    <input type="text" id="address" value={USERINFORMATION.address}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="postalCode">Postnummer:</label>
                    <input type="text" id="postalCode" value={USERINFORMATION.postalCode}/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="city">Postort:</label>
                    <input type="text" id="city" value={USERINFORMATION.city}/>
                </div>
                <button className={styles.saveChangeButton} onClick={handleSaveChanges}>Spara ändring</button>
            </div>
        </main>
    );
}
