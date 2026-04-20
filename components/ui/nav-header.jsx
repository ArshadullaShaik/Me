"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} targetId="home">Home</Tab>

      <Tab setPosition={setPosition} targetId="about">About Me</Tab>
      <Tab setPosition={setPosition} targetId="projects">Projects</Tab>
      <Tab setPosition={setPosition} targetId="contact">Contact</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({ children, setPosition, targetId }) => {
  const ref = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <li
      ref={ref}
      onClick={handleClick}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default NavHeader;

