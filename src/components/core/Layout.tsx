import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
