/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import ArrowRight from "../assets/arrow-right.svg?react";
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
        const response = await axios.get("/api/isloggedin");
        setIsLoggedIn(response.data.isLoggedIn); // Update state based on response
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsLoggedIn(false); // Assume not logged in if there's an error
      }
    };
  
    checkAuthStatus();
  }, [isLoggedIn]);
  // 🔹 MODIFIED: Logout function
  
  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.clear();
      setIsLoggedIn(false); // Clear authentication state
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed", error);
    }
    console.log(isLoggedIn,"from header page")
  };
  return (
    <header className="sticky top-0 backdrop-blur-xs z-20">
    <div className="py-5 dark:bg-gray-700/80">
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
