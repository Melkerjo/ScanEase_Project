"use client"
import styles from "./Navigation.module.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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


    const router = useRouter();

      const handleLogin = () => {
        router.push('/login');
      };

      const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn')
        };
    
      const handleCreateAccount = () => {
        router.push('/create-account');
      };

      const handleLinkClick = () => {
        setIsOpen(false); // Stäng menyn när en länk klickas på
    };

   
//Links in the nav meny
    const LINKS = [
        { href: '/', text: 'Hem', visible: true },
        { href: '/shop', text: 'Handla', visible: isLoggedIn }, // Visible for all users
        { href: '/my-order', text: 'Mina beställningar', visible: isLoggedIn }, // Visible only if logged in
        { href: '/my-account', text: 'Mitt konto', visible: isLoggedIn },  // Visible only if logged in
        { href: '/contact', text: 'Kontakt/Frågor & Svar', visible: true } // Visible for all users
    ];

    
    return(<div className={styles.navbar}>
        <div className={styles.menuContainer}>
          <div className={styles.hamburgerMenu} onClick={toggleMenu}>
            <span className={isOpen ? `${styles.hamburgerMenuText} ${styles.hamburgerMenuTextOpen}` : styles.hamburgerMenuText}>Meny</span>
          </div>
        </div>
        <div className={isOpen ? `${styles.menu} ${styles.open}` : styles.menu}>
            <div>
                {LINKS.map((link, index) => link.visible && <NavigationLink key={index} text={link.text} href={link.href} onClick={handleLinkClick} />)}
            </div>
        </div>
        {isLoggedIn && (
                <div className={styles.loginoutButton}>
                    <button className={styles.login} onClick={handleLogout} >
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

function NavigationLink({ text, href, onClick }) {
  const handleLinkClick = () => {
      if (onClick) {
          onClick(); 
      }
  };

  return (
      <Link href={href} className={styles.navlinks} onClick={handleLinkClick}>
          <h2>{text}</h2>
      </Link>
  );

}

