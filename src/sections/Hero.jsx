
import ArrowIcon from "../assets/arrow-right.svg?react";
import cogImage from "../assets/3d hospital.jpg";;
// import cylinderImage from "../assets/cylinder.png";
// import noodleImage from "../assets/noodle.png";

import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    // <section
    //   ref={heroRef}
    //   className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    // >
    //   <div className="container">
    //     <div className="md:flex items-center">
    //       <div className="md:w-[478px]">
    //         <div className="tag">Version 2.0 is here</div>
    //         <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-linear-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
    //           Pathway to productivity
    //         </h1>
    //         <p className="text-xl text-[#010D3E] tracking-tight mt-6">
    //           Celebrate the joy of accomplishment with an app designed to track
    //           your progress, motivate your efforts, and celebrate your
    //           successes.
    //         </p>
    //         <div className="flex gap-1 items-center mt-[30px]">
    //           <button className="btn btn-primary">Get for free</button>
    //           <button className="btn btn-text gap-1">
    //             <span>Learn more</span>
    //             <ArrowIcon className="h-5 w-5" />
    //           </button>
    //         </div>
    //       </div>
    //       <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
    //         <motion.img
    //           src={cogImage}
    //           alt="Cog image"
    //           className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
    //           animate={{
    //             translateY: [-30, 30],
    //           }}
    //           transition={{
    //             repeat: Infinity,
    //             repeatType: "mirror",
    //             duration: 3,
    //             ease: "easeInOut",
    //           }}
    //         />
    //         <motion.img
    //           src={cylinderImage}
    //           width={220}
    //           height={220}
    //           alt="Cylinder image"
    //           className="hidden md:block -top-8 -left-32 md:absolute"
    //           style={{
    //             translateY: translateY,
    //           }}
    //         />
    //         <motion.img
    //           src={noodleImage}
    //           width={220}
    //           alt="Noodle image"
    //           className="hidden lg:block absolute top-[524px] left-[448px] rotate-[30deg]"
    //           style={{
    //             rotate: 30,
    //             translateY: translateY,
    //           }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section
    ref={heroRef}
    className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
  >
    <div className="container">
      <div className="md:flex items-center">
        <div className="md:w-[478px]">
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-linear-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
          Gateway to Transparent and Trusted Care
          </h1>
          <p className="text-xl text-[#010D3E] tracking-tight mt-6">
            Celebrate the joy of accomplishment with a website designed to provide you with country's finest pharmaceutical facilities, and celebrate your
            health.
          </p>
          <div className="flex gap-1 items-center mt-[30px]">
            <button className="btn btn-primary">Get for free</button>
            <button className="btn btn-text gap-1">
              <span>Learn more</span>
              <ArrowIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
        <motion.img
            src={cogImage}
            alt="3D Hospital Image"
            className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
            initial={{
              rotateY: -25, // tilt: left side goes in, right comes out
              rotateX: 10,  // optional: a slight top tilt
            }}
            animate={{
              translateY: [-30, 30],
              rotateY: -25, // stays constant for the 3D tilt
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 800,
            }}
          />

          
        </div>
      </div>
    </div>
  </section>
  );
};
