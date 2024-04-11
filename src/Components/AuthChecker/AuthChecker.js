"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '../../app/loadingspinner/loadingspinner'; 

const unsecuredPages = ['/my-account', '/my-order', '/shop'];

export default function AuthChecker({ children }) {
  const pathname = usePathname()
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let loggedInState = localStorage.getItem('isLoggedIn');
    if (loggedInState === null) {
        loggedInState = false;
    }
    const isUnsecuredPage = unsecuredPages.includes(pathname);
    
    console.log('Current path:', pathname);
    console.log('Is logged in:', loggedInState);
    console.log('Is unsecured page:', isUnsecuredPage);
    
    if (!loggedInState && isUnsecuredPage) {
        setIsLoading(true); 
    } else {
      setIsLoading(false); 
    }
    if (!loggedInState && isUnsecuredPage && !isLoading) {
        router.push('/');
    }

  }, [pathname, router]);

  if (isLoading) {
    return <LoadingSpinner />; 
  }
  else{return children;}

  
};
