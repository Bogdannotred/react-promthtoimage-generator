
  import "./App.css";
  import ScrollHideHeader from "./Scrolling-hide-header"
  import { auth } from "./firebase";
  import { signOut } from "firebase/auth";
  import { useNavigate } from "react-router-dom";


  function HomePage() {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/"); // redirect către login
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
      return (
          <main>
            <ScrollHideHeader/>
            <div className="content">
              <div className="section-one">
                <button style={{width:100}} onClick={handleLogout}>Logout</button>
                
                <h1>Transform your vision into art</h1>
                
                <h3 className="paragraf">Create stunning AI-generated image or bring your black & white photos to life with our advanced colorization technology</h3>
              </div>
              <div className="section-two">
                <h1>A doua secțiune cu altă culoare!</h1>
                <p>Continuă derularea pentru a descoperi mai multe.</p>
              </div>
            </div>
          </main>
        );
  }

  export default HomePage;