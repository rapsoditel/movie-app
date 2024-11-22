import Header from "./Header";
import { Outlet } from "react-router-dom";
interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
