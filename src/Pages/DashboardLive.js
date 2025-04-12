import React, { useState } from "react";
import Live from "../Components/Live";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'



export default function DasboardLive() {

  return (
    <div>
      <Navbar />
      <Live />
      <MobileNav/>
    </div>
  );
};