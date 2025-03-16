import { useEffect } from "react";
import ArrowRight from "../assets/arrow-right.svg?react";
import Logo from "../assets/logosaas.png";
import MenuIcon from "../assets/menu.svg?react";
import ThemeToggle from "../components/ThemeToggle";
import axios from "axios";
export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-xs z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-5  dark:bg-gray-700/80">
        <div className="container">
          <div className="flex items-center justify-between ">
            <img src={Logo} alt="Saas Logo" height={40} width={40} />
            <MenuIcon className="h-5 w-5 md:hidden" />
            <nav className="hidden md:flex gap-6 text-black/60 items-center dark:text-white">
              <a href="#">About</a>
              <a href="#">Features</a>
              <a href="#">Customers</a>
              <a href="#">Updates</a>
              <a href="#">Help</a>
              <ThemeToggle/>
              <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight">
                Get for free
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
