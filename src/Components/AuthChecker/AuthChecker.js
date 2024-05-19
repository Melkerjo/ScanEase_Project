"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '../../app/loadingspinner/loadingspinner'; 

// List of unsecured pages
const unsecuredPagesOutLogged = ['/my-account', '/my-order', '/shop'];
const unsecuredPagesInLogged = ['/create-account', '/login'];

export default function AuthChecker({ children }) {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    const loggedInState = localStorage.getItem('isLoggedIn') === 'true';

    // Check if user is not logged in and the page is unsecured, then set loading state to true
    const isUnsecuredPageOutLogged = unsecuredPagesOutLogged.includes(pathname);
    const isUnsecuredPageInLogged = unsecuredPagesInLogged.includes(pathname);
    
    if (!loggedInState && isUnsecuredPageOutLogged) {
      setIsLoading(true); 
    } else if (loggedInState && isUnsecuredPageInLogged) {
      setIsLoading(true);
    } else {
      setIsLoading(false); 
    }
    
    // Redirect to home page if user is not logged in, page is unsecured, and not already loading
    if (!loggedInState && isUnsecuredPageOutLogged && !isLoading) {
      router.push('/');
    } else if (loggedInState && isUnsecuredPageInLogged && !isLoading) {
      router.push('/');
    }

  }, [pathname, router]);

  // Render loading spinner if loading, otherwise render children
  if (isLoading) {
    return <LoadingSpinner />; 
  } else {
    return children;
  }
};
