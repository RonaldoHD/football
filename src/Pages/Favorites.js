import React, { useState, useEffect } from "react";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'
import { HeartOff , ArrowLeftFromLine  } from 'lucide-react';



export default function Favorites() {
    return (
        <div>
            <Navbar />

            <section>
                <h2 className="p-2">Favorites</h2>

                <div className="d-flex flex-column align-items-center my-5" >
                    <HeartOff size={60} color="var( --text-blue)" />
                    <h3>No Favorites</h3>
                    <p>Go to dashboard and add a game to favorites</p>
                    <a href="/dashboard/matches" style={{textDecoration:'none'}}>
                    <ArrowLeftFromLine /> See Matches</a>
                </div>

            </section>

            <MobileNav />
        </div>
    )
}
