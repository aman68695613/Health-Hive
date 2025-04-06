
// import acmeLogo from "../assets/logo-acme.png";
// import quantumLogo from "../assets/logo-quantum.png";
// import echoLogo from "../assets/logo-echo.png";
// import celestialLogo from "../assets/logo-celestial.png";
// import pulseLogo from "../assets/logo-pulse.png";
// import apexLogo from "../assets/logo-apex.png";
// import { motion } from "framer-motion";

// export const LogoTicker = () => {
//   return (
//     <div className="py-8 md:py-12 bg-white">
//       <div className="container">
//         <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
//           <motion.div
//             className="flex gap-14 flex-none pr-14"
//             animate={{
//               translateX: "-50%",
//             }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               ease: "linear",
//               repeatType: "loop",
//             }}
//           >
//             <img
//               src={acmeLogo}
//               alt="Acme Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={quantumLogo}
//               alt="Quantum Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={echoLogo}
//               alt="Echo Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={celestialLogo}
//               alt="Celestial Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={pulseLogo}
//               alt="Pulse Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={apexLogo}
//               alt="Apex Logo"
//               className="logo-ticker-image"
//             />

//             {/* Second set of logos for animation */}
//             <img
//               src={acmeLogo}
//               alt="Acme Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={quantumLogo}
//               alt="Quantum Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={echoLogo}
//               alt="Echo Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={celestialLogo}
//               alt="Celestial Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={pulseLogo}
//               alt="Pulse Logo"
//               className="logo-ticker-image"
//             />
//             <img
//               src={apexLogo}
//               alt="Apex Logo"
//               className="logo-ticker-image"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };


import acmeLogo from "../assets/max hospital.png";
import quantumLogo from "../assets/apollo-hospitals.png";
import echoLogo from "../assets/medanta.png";
import celestialLogo from "../assets/narayana.png";

import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <img
              src={acmeLogo}
              alt="Acme Logo"
              className="h-20 w-auto"
            />
            <img
              src={quantumLogo}
              alt="Quantum Logo"
              className="h-20 w-auto"
            />
            <img
              src={echoLogo}
              alt="Echo Logo"
              className="h-20 w-auto"
            />
            <img
              src={celestialLogo}
              alt="Celestial Logo"
              className="h-20 w-auto"
            />
            
            {/* Second set of logos for animation */}
            <img
              src={acmeLogo}
              alt="Acme Logo"
              className="h-20 w-auto"
              
            />
            <img
              src={quantumLogo}
              alt="Quantum Logo"
              className="h-20 w-auto"
            />
            <img
              src={echoLogo}
              alt="Echo Logo"
              className="h-20 w-auto"
            />
            <img
              src={celestialLogo}
              alt="Celestial Logo"
              className="h-20 w-auto"
            />
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};
