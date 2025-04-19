import React, { useState, useEffect } from "react";
import "./App.css";

function ScrollHideHeader() {
  const [scrolling, setScrolling] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header ${scrolling ? "hidden" : ""}`}>
      <div className="logo">Logo</div>

      <h1 className="nume">Ai Studio</h1>

      <div className="Dreapta-Header">
        <h1>Home</h1>
        <h1>Features</h1>
        <h1>Gallery</h1>
      </div>

      <div className="hamburger" onClick={() => setShowMenu(!showMenu)}>
        ☰
      </div>

      {showMenu && (
        <div className="mobile-menu">
          <h1>Home</h1>
          <h1>Features</h1>
          <h1>Gallery</h1>
          <h1>Contact</h1>
        </div>
      )}
    </div>
  );
}

export default ScrollHideHeader;
