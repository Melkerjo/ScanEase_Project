import "./globals.css";
import Navigation from "../../src/Components/Navigation/Navigation";
import Footer from "../../src/Components/Footer/Footer";
import AuthChecker from "../Components/AuthChecker/AuthChecker";

const Layout = ({ children }) => {
  return (
    <>
      <html lang="en">
        <body>
          <Navigation />
          <AuthChecker>{children}</AuthChecker>
          <Footer />
        </body>
      </html>
    </>
  );
};

export default Layout;
