import React from 'react'
import FixtureDetails from '../Components/FixtureDetails.js'
import MobileNav from '../Components/MobileNav'
import Navbar from '../Components/Navbar.js'
export default function FixtureDetailsPage() {
  return (
    <div>
          <Navbar/>

      <FixtureDetails/>
      <MobileNav/>
    </div>
  )
}
