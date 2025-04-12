import React, { useState } from "react";
import FixturesPage from "../Components/FixturesPage";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'
import Leagues from "../Components/Leagues.js";


export default function Dashboard() {

  return (
    <div>
      <Navbar />
      <Leagues />
      <MobileNav/>
    </div>
  );
};
