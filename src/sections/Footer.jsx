import logo from "../assets/Screenshot (2333).png";
import SocialX from "../assets/social-x.svg?react";
import SocialInsta from "../assets/social-insta.svg?react";
import SocialLinkedIn from "../assets/social-linkedin.svg?react";
import SocialPin from "../assets/social-pin.svg?react";
import SocialYoutube from "../assets/social-youtube.svg?react";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur-sm before:bg-[linear-gradient(to_right,#00F5FF,#00D4FF,#1A8FE3)]



 before:absolute">
          <img src={logo}  alt="SaaS logo" className="relative h-15 w-auto" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="#">About</a>
          <a href="#">Features</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <SocialX />
          <SocialInsta />
          <SocialLinkedIn />
          <SocialPin />
          <SocialYoutube />
        </div>
        <p className="mt-6">
          &copy; 2025 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
