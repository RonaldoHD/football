import React, { useState, useRef, useEffect } from "react";
import Navbar from '../Components/Navbar.js';
import MobileNav from '../Components/MobileNav.js';
import axios from 'axios';
import dayjs from "dayjs";
import Slider from "react-slick";
import CompetitionSkeleton from '../Components/CompetitionSkeleton.js'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Dashboard() {
  const sliderRef = useRef(null);

  const [leaguesData, setLeaguesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [Loading, setLoading] = useState(false);


  const fetchData = async (date) => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
      params: { date },
      headers: {
        'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log("Fetched DATA:", response.data);
      setLeaguesData(response.data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  


  const changeDate = (date) => {
    const formatted = date.format("YYYY-MM-DD");
    console.log(formatted);
    setSelectedDate(formatted);
    fetchData(formatted);
  };
  

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD");
    setSelectedDate(today);
    fetchData(today); // initial load
  
    const index = dateList.findIndex(d => d.format("YYYY-MM-DD") === today);
    if (sliderRef.current && index !== -1) {
      setTimeout(() => {
        sliderRef.current.slickGoTo(index);
      }, 200);
    }
  }, []); // <- remove selectedDate from the dependency array
  


  const favoriteLeagues = [
    { name: "Ligue 1", country: "France" },
    { name: "Premier League", country: "England" },
    { name: "Bundesliga", country: "Germany" },
    { name: "Serie A", country: "Italy" },
    { name: "Copa Del Rey", country: "Spain" },
    { name: "La Liga", country: "Spain" },
  ];

  const dateList = Array.from({ length: 14 }, (_, i) =>
    dayjs().subtract(7, "day").add(i, "day")
  );

  const formatDateLabel = (date) => {
    return `${date.format('dd').toUpperCase()} ${date.format('DD-MM')}`;
  };

  // Grouping leagues
  const groupedFavorites = {};
  const groupedOthers = {};

  leaguesData.forEach((league) => {
    if (league?.league && league?.league.id) {
      const isFavorite = favoriteLeagues.some(
        (fav) =>
          fav.name === league.league.name &&
          fav.country === league.league.country
      );

      const group = isFavorite ? groupedFavorites : groupedOthers;
      const leagueId = league.league.id;

      if (!group[leagueId]) {
        group[leagueId] = {
          leagueInfo: league.league,
          fixturesCount: 1,
        };
      } else {
        group[leagueId].fixturesCount += 1;
      }
    }
  });

  const filteredFavorites = Object.values(groupedFavorites);
  const otherLeagues = Object.values(groupedOthers);

  console.log("FAVS : ", filteredFavorites)

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  return (
    <div>
      <Navbar />

      <section className="container">

        {/* React Slick Date Carousel */}
        <div className="py-3">
          <Slider ref={sliderRef} {...settings}>
            {dateList.map((date, index) => {
              const isSelected = date.format("YYYY-MM-DD") === selectedDate;
              return (
                <div key={index}>
                  <div
                    onClick={() => changeDate(date)}
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      borderRadius: "8px",
                      textAlign: "center",
                      color: isSelected ? "var(--text-blue)" : "white",
                      backgroundColor: isSelected ? "var(--light-blue)" : "transparent",
                    }}
                  >
                    {formatDateLabel(date)}
                  </div>
                </div>
              );
            })}
          </Slider>

        </div>

        {Loading ? <CompetitionSkeleton /> : (

          <table className="w-100">
            <tbody>
              {/* Favorite Competitions */}
              <tr>
                <td colSpan={2} className="p-2" style={{ backgroundColor: "var(--light-blue)", color: "var(--text-blue)" }}>
                  <p className="p-0 m-0">FAVORITE COMPETITIONS</p>
                </td>
              </tr>
              {filteredFavorites.length != 0 ? filteredFavorites.map((item, index) => (
                <tr key={`fav-${index}`} onClick={() => window.location.href = `/dashboard/singleLeague?league=${item.leagueInfo.id}&date=${selectedDate}`}>
                  <td>
                    <div style={{ padding: "5px 10px" }} className="d-flex flex-row gap-3">
                      <img
                        width="30"
                        src={item.leagueInfo.flag}
                        alt={`${item.leagueInfo.country} flag`}
                      />
                      <div>
                        <p className="p-0 m-0" style={{ opacity: "55%" }}>
                          {item.leagueInfo.country}
                        </p>
                        <p className="p-0 m-0">{item.leagueInfo.name}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{item.fixturesCount}</td>
                </tr>
              )) :
                <div>
                  <p className="p-2 , m-0">No Favorite competitions</p>
                </div>}

              {/* Other Competitions */}
              <tr>
                <td colSpan={2} className="p-2" style={{ backgroundColor: "var(--light-blue)" }}>
                  <p className="p-0 m-0">OTHER COMPETITIONS</p>
                </td>
              </tr>
              {otherLeagues.slice(0, 60).map((item, index) => (
                <tr key={`other-${index}`} onClick={() => window.location.href = `/dashboard/singleLeague?league=${item.leagueInfo.id}&date=${selectedDate}`}>
                  <td>
                    <div style={{ padding: "5px 10px" }} className="d-flex flex-row gap-3">
                      <img
                        width="30" loading="lazy"
                        src={item.leagueInfo.flag ? item.leagueInfo.flag : item.leagueInfo.logo}
                        alt={`${item.leagueInfo.country} flag`}
                      />
                      <div>
                        <p className="p-0 m-0" style={{ opacity: "55%" }}>
                          {item.leagueInfo.country}
                        </p>
                        <p className="p-0 m-0">{item.leagueInfo.name}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>{item.fixturesCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </section>

      <MobileNav />
    </div >
  );
}
