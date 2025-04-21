import React, { useState, useEffect } from "react";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'
import { Ban, ArrowLeftFromLine } from 'lucide-react';



export default function Favorites() {

    async function fetchNews() {

        const url = 'https://latest-football-news.p.rapidapi.com/news';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909',
                'x-rapidapi-host': 'latest-football-news.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchNews()
    })
    return (
        <div>
            <Navbar />

            <section>
                <h2 className="p-2">News</h2>

                <div className="d-flex flex-column align-items-center my-5" >
                    <Ban size={60} color="var( --text-blue)" />
                    <p style={{textAlign:'center'}} >There was an error getting news, <br></br> please try again later.</p>
                    <button className="btn-primary" onClick={()=>window.location.reload()} >Refresh</button>
                </div>

            </section>

            <MobileNav />
        </div>
    )
}
