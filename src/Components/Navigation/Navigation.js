"use client"
import styles from "./Navigation.module.css";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
     };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const loggedInState = localStorage.getItem('isLoggedIn');
      if (loggedInState) {
          setIsLoggedIn(true);
      }
  }, []);


      const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true)
      };

      const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn')
        };
    
      const handleCreateAccount = () => {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', true)
      };

   

    const LINKS = [
        { href: '/', text: 'Hem', visible: true },
        { href: '/shop', text: 'Handla', visible: true }, // Visible for all users
        { href: '/my-order', text: 'Mina beställningar', visible: isLoggedIn }, // Visible only if logged in
        { href: '/my-account', text: 'Mitt konto', visible: isLoggedIn },  // Visible only if logged in
        { href: '/contact', text: 'Kontakt/Frågor & Svar', visible: isLoggedIn } // Visible for all users
    ];

    
    return(<div className={styles.navbar}>
        <div className={styles.menuContainer}>
          <div className={styles.hamburgerMenu} onClick={toggleMenu}>
            <span className={isOpen ? `${styles.hamburgerMenuText} ${styles.hamburgerMenuTextOpen}` : styles.hamburgerMenuText}>Meny</span>
          </div>
        </div>
        <div className={isOpen ? `${styles.menu} ${styles.open}` : styles.menu}>
            <div>
                {LINKS.map((link, index) => link.visible && <NavigationLink key={index} text={link.text} href={link.href} />)}
            </div>
        </div>
        {isLoggedIn && (
                <div className={styles.loginoutButton}>
                    <button className={styles.login} onClick={handleLogout}>
                        Logga ut
                    </button>
                </div>
            )}
        {!isLoggedIn && (
                <div className={styles.loginoutButton}>
                    <button className={styles.login} onClick={handleLogin}>
                        Logga in
                    </button>
                    <button className={styles.createAccount} onClick={handleCreateAccount}>
                        Skapa konto
                    </button>
                </div>
            )}
      </div>
      
    );
    
}

function NavigationLink({ text, href }) {
  
    return (
      <Link href={href} className={styles.navlinks}>
        <h2>{text}</h2>
      </Link>
    );  

}