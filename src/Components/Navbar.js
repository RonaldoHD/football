import React , {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import logo from '../3.png'


export default function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add GTranslate settings to window
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["en", "ar" ],
      wrapper_selector: ".gtranslate_wrapper",
    };

    // Create and append script
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);



  return (
    <section className="py-2" style={{ boxShadow: '#ffffff26 1px 1px 1px' }} >
      <nav className="navbar container navbar-expand-lg ">
        <div className="container">
          <div className="d-flex flex-row align-items-center" >
            <p onClick={() => navigate(-1)} className="p-2 m-0"><ChevronLeft /></p>
            <img width={90} src={logo} />
          </div>
       
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Dashboard</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">Dashboard</a>
              </li>


            </ul>

        
          </div>

          <div className="gtranslate_wrapper"></div>

        </div>
      </nav>
    </section>
  );
}
