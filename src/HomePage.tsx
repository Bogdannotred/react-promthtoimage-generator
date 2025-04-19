import "./App.css";
import ScrollHideHeader from "./Scrolling-hide-header";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
            <button style={{ width: 100 }} onClick={handleLogout}>
              Logout
            </button>
            <h1>Transform your vision into art</h1>
            <h3 className="paragraf">
              Create stunning AI-generated image or bring your black & white photos
              to life with our advanced colorization technology
            </h3>
          </div>
        </div>

        <div className="section-two">
            <form className="text2img-form">
              <h2>Text to Image</h2>
              <input type="text" placeholder="Enter your text here" />
              <button type="submit">Generate</button>
            </form>

            <form className="blacktocolor-form">
              <h2>Text to Image</h2>
              <input type="file" accept="image/*" />
              <button type="submit">Generate</button>
            </form>
        </div>
      </div>
    </main>
  );
}
export default HomePage;