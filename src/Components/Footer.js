import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGooglePlay, FaApple } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row">
          {/* Website Logo Section */}
          <div className="col-md-3 text-center text-md-start">
            <h4 className="fw-bold">YourLogo</h4>
            <p>Best place for all your needs.</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-3 text-center text-md-start">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none">About</a></li>
              <li><a href="#" className="text-light text-decoration-none">Services</a></li>
              <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-3 text-center text-md-start">
            <h5>Contact Us</h5>
            <p>Email: support@example.com</p>
            <p>Phone: +123 456 7890</p>
            <div>
              <a href="#" className="text-light me-2"><FaFacebook size={20} /></a>
              <a href="#" className="text-light me-2"><FaTwitter size={20} /></a>
              <a href="#" className="text-light"><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Download App Section */}
          <div className="col-md-3 text-center text-md-start">
            <h5>Download Our App</h5>
            <button className="btn btn-outline-light btn-sm d-block my-2">
              <FaGooglePlay /> Google Play
            </button>
            <button className="btn btn-outline-light btn-sm d-block">
              <FaApple /> App Store
            </button>
          </div>
        </div>
      </div>

  
    </footer>
  );
}
