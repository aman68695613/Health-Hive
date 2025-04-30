import { useEffect, useState } from "react";
import Logo from "../assets/Screenshot (2333).png";
import MenuIcon from "../assets/menu.svg?react";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/isloggedin");
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="sticky top-0 backdrop-blur-xs z-20">
      <div className="py-5 dark:bg-[#0D1B2A]/80">
        <div className="container">
          <div className="flex items-center justify-between">
            <a href="/">
              <img src={Logo} alt="Saas Logo" className="h-16 w-auto" />
            </a>
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center dark:text-white">
              <a href="#">About</a>
              <a href="/basepage">Services</a>
              <a href="#">Customers</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>
            </nav>
            <div className="hidden md:flex gap-6 text-black/60 items-center dark:text-white">
              <ThemeToggle />
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                Get for free
              </button>
              {isLoggedIn ? (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight hover:bg-red-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                  <button
                    className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
