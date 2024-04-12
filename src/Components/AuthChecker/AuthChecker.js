"use client" 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '../../app/loadingspinner/loadingspinner'; 

// List of unsecured pages
const unsecuredPages = ['/my-account', '/my-order', '/shop'];

export default function AuthChecker({ children }) {
  const pathname = usePathname(); // Get the current pathname
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    let loggedInState = localStorage.getItem('isLoggedIn');
    if (loggedInState === null) {
      loggedInState = false;
    }
    const isUnsecuredPage = unsecuredPages.includes(pathname);
    
    // Logging for debugging purposes
    console.log('Current path:', pathname);
    console.log('Is logged in:', loggedInState);
    console.log('Is unsecured page:', isUnsecuredPage);
    
    // Check if user is not logged in and the page is unsecured, then set loading state to true
    if (!loggedInState && isUnsecuredPage) {
      setIsLoading(true); 
    } else {
      setIsLoading(false); 
    }
    
    // Redirect to home page if user is not logged in, page is unsecured, and not already loading
    if (!loggedInState && isUnsecuredPage && !isLoading) {
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
