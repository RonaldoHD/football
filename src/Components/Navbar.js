import React from "react";

export default function Navbar() {
  return (
    <section className="py-2" style={{boxShadow:'#ffffff26 1px 1px 8px'}} >
        <nav className="navbar container navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" 
        // style={{fontWeight:'bold' , color:'var(--text-blue)!important'}} 
        >Z-Sport</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
