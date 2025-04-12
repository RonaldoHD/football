import React, { useState } from "react";
import FixturesPage from "../Components/FixturesPage";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'



export default function Dashboard() {

  return (
    <div>
      <Navbar />
      <FixturesPage />
      <MobileNav/>
    </div>
  );
};
