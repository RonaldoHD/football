import React, { useState, useEffect } from "react";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'
import { Ban, ChevronRight } from 'lucide-react';
import { sampleNews } from "../News.js";



export default function News() {
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

            <section style={{ marginBottom: '7rem' }} >
                <h1 className="p-2">Latest Football News</h1>
                <div className="news-grid">
                    {news.map((item, index) => (

                        <div className="row news-card" >
                            <div className="col-5" >
                                <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'100%'}}>
                                    <img src={item.image} 
                                    alt={item.title} width={'100%'} height={'100%'} 
                                    style={{ borderRadius: '5px' , objectFit:'cover'}} />
                                </div>
                            </div>
                            <div className="col-7" >
                                <div className="d-flex flex-column justify-content-between align-items-start gap-2" style={{ height: '100%' }}>
                                    <p className="m-0" >{item.title}</p>
                                    <a className="read-more"
                                        href={item.original_url} target="_blank"
                                        rel="noopener noreferrer">Read more<ChevronRight size={15} /></a>
                                </div>
                            </div>
                        </div>


                    ))}
                </div>
            </section>

            <MobileNav />
        </div>
    )
}
