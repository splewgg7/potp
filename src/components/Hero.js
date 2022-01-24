import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      duration: 3,
    });
  }, []);

  return (
    <div ref={heroRef} className="hero">
      <span>
        <a href="https://en.wikipedia.org/wiki/Malaca%C3%B1ang_Palace">
          ABOUT THE MALACAÑANG
        </a>
      </span>
      <h1>Presidents </h1>
      <h2>Learn more about the Presidents of the Philippines.</h2>
    </div>
  );
};

export default Hero;
