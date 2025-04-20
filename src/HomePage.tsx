import "./App.css";
import ScrollHideHeader from "./Scrolling-hide-header";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  return (
    <main>
      <ScrollHideHeader />
      <div className="content">
        <div className="section-one parallax-section">
          <div
            className="parallax-background"
            style={{
              transform: `translateY(${scrollPosition * 0.4}px)`
            }}
          />
          <div className="parallax-content">
            <h1>Transform your vision into art</h1>
            <h3 className="paragraf">
              Create stunning AI-generated image or bring your black & white photos
              to life with our advanced colorization technology
            </h3>
          </div>
        </div>

        <div className="section-two">
            <form className="text2img-form">
              <h2 className="textsec2">Text to Image</h2>
              <input style = {{backgroundColor: "white" , color : "black" , justifyContent : "center" , alignContent:"center"}} type="text" placeholder="Enter your text here" />
              <button type="submit">Generate</button>
            </form>

            <form className="blacktocolor-form">
              <h2 className="textsec2">Text to Image</h2>
              <input type="file" accept="image/*" />
              <button type="submit">Generate</button>
            </form>
        </div>
      </div>
    </main>
  );
}
export default HomePage;