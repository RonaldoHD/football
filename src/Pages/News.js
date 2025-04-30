import React, { useState, useEffect } from "react";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'
import { Ban, ArrowLeftFromLine } from 'lucide-react';
import { sampleNews } from "../News.js";



export default function Favorites() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        // Replace this with your API logic if it starts working
        setNews(sampleNews);
      }, []);

    

    // async function fetchNews() {

    //     const url = 'https://latest-football-news.p.rapidapi.com/news';
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909',
    //             'x-rapidapi-host': 'latest-football-news.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         const result = await response.text();
    //         console.log(result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchNews()
    // })


    return (
        <div>
            <Navbar />

            <section>
  <h2 className="p-2">Latest Football News</h2>
  <div className="news-grid">
    {news.map((item, index) => (
      <div key={index} className="news-card">
        <img src={item.image} alt={item.title} style={{ width: "100%", borderRadius: "8px" }} />
        <h4>{item.title}</h4>
        <p>{item.summary}</p>
        <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    ))}
  </div>
</section>

            <MobileNav />
        </div>
    )
}
