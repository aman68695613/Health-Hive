// components/Layout.jsx
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <Navbar />
      <div >{children}</div>
    </div>
  );
};

export default Layout;
