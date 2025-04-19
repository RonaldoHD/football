import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';


export default function Navbar() {
  const navigate = useNavigate();


  return (
    <section className="py-2" style={{ boxShadow: '#ffffff26 1px 1px 1px' }} >
      <nav className="navbar container navbar-expand-lg ">
        <div className="container">
          <div className="d-flex flex-row align-items-center" >
            <p onClick={() => navigate(-1)} className="p-2 m-0">    <ChevronLeft /></p>
            <a className="navbar-brand" >Z-Sport</a>
          </div>
          {/* <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Dashboard</a>
              </li>


            </ul>
            <form className="d-flex" role="search">

              <button className="btn btn-outline-primary" type="submit">
                Download App
              </button>
            </form>
          </div>
        </div>
      </nav>
    </section>
  );
}
