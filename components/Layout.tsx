import Navigation from "./Navigation";
import Footer from "./Footer";
import { ReactNode } from "react";
 
interface ILayout {
    children: ReactNode
}

const Layout = ({ children } : ILayout) => (
  <div>
    <Navigation/>
      {children}
    <Footer />
  </div>
);
 
export default Layout;