"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Navigation from "../../src/Components/Navigation/Navigation";
import Footer from "../../src/Components/Footer/Footer";
import AuthChecker from "../Components/AuthChecker/AuthChecker";

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const admin = ['/admin'];
  const isAdminPage = admin.includes(pathname);

  const renderHeaderAndFooter = () => {
    if (isAdminPage) {
      return (<>{children}</>); // Returnera inget om det är adminläge
    } else {
      return (
        <>
          <Navigation />
          <AuthChecker>{children}</AuthChecker>
          <Footer />
        </>
      );
    }
  };

  return (
    <>
      <html lang="en">
        <body>
          {renderHeaderAndFooter()}
        </body>
      </html>
    </>
  );
};

export default Layout;
