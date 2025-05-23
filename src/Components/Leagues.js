import React, { useState, useEffect } from "react";
import { leagues } from "../leagues.js";
import dayjs from "dayjs";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';




// url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
//   params: {date: '2021-01-29'},


//   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
//   params: {id: '157201'},

//   url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',

//   url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
//   params: {id: '39'},

//   url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
//   params: {fixture: '568987'},


//   headers: {
//     'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909',
//     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
//   }



export default function Leagues() {

useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration in ms
        once: true,     // whether animation should happen only once
      });
    }, []);


  const [leaguesData, setLeaguesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    setLeaguesData(leagues.response);
  }, []);

  const favoriteLeagues = [
    { name: "Ligue 1", country: "France" },
    { name: "Premier League", country: "England" },
    { name: "Bundesliga", country: "Germany" },
    { name: "Serie A", country: "Italy" },
    { name: "La Liga", country: "Spain" },
  ];

  const dateList = Array.from({ length: 14 }, (_, i) =>
    dayjs().subtract(7, "day").add(i, "day")
  );

  const formatDateLabel = (date) => {
    return `${date.format("dd").toUpperCase()} ${date.format("DD.MM")}`;
  };

  const selectedYear = selectedDate.year();

  // const filteredLeagues = leaguesData.filter((league) =>
  //   league.seasons?.some((season) => season.year === selectedYear)
  // );

  const filteredLeagues = leaguesData

  const filteredFavorites = filteredLeagues.filter((league) =>
    favoriteLeagues.some(
      (fav) =>
        fav.name === league.league.name &&
        fav.country === league.country.name
    )
  );

  const otherLeagues = filteredLeagues.filter(
    (league) => !filteredFavorites.includes(league)
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div>
      {/* React Slick Date Carousel */}
      {/* <div style={{ padding: "15px 10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <Slider {...settings}>
          {dateList.map((date, index) => {
            const isSelected = date.isSame(selectedDate, "day");
            return (
              <div key={index}>
                <div
                  onClick={() => setSelectedDate(date)}
                  style={{
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: isSelected ? "var(--text-blue)" : "white",
                    textAlign: "center",
                    margin: "0 5px",
                    minHeight: "10px",
                  }}
                >
                  {formatDateLabel(date)}
                </div>
              </div>
            );
          })}
        </Slider>
      </div> */}

      {/* Leagues Table */}
      <table className="w-100">
        <tbody>
          {/* Favorite Competitions */}
          <tr>
            <td colSpan={2} className="p-2" style={{ backgroundColor: "var(--light-blue)" }}>
              <p className="p-0 m-0">FAVORITE COMPETITIONS</p>
            </td>
          </tr>
          {filteredFavorites.map((league, index) => (
            <tr key={`fav-${index}`} >
              <td>
                <div  style={{ padding: "5px 10px" }} className="d-flex flex-row gap-3">
                  <img
                    width="30"
                    style={{ borderRadius: "15px" }}
                    src={league.country.flag}
                    alt={`${league.country.name} flag`}
                  />
                  <div>
                    <p className="p-0 m-0" style={{ opacity: "55%" }}>
                      {league.country.name}
                    </p>
                    <p className="p-0 m-0">{league.league.name}</p>
                  </div>
                </div>
              </td>
              <td style={{ verticalAlign: "middle" }}>{league.seasons?.length || 0}</td>
            </tr>
          ))}

          {/* Other Competitions */}
          <tr>
            <td colSpan={2} className="p-2" style={{ backgroundColor: "var(--light-blue)" }}>
              <p className="p-0 m-0">OTHER COMPETITIONS</p>
            </td>
          </tr>
          {otherLeagues.slice(0, 30).map((league, index) => (
            <tr key={`other-${index}`}>
              <td  >
                <div  style={{ padding: "5px 10px" }} className="d-flex flex-row gap-3">
                  <img
                    width="30"
                    style={{ borderRadius: "15px" }}
                    src={league.country.flag}
                    alt={`${league.country.name} flag`}
                  />
                  <div>
                    <p className="p-0 m-0" style={{ opacity: "55%" }}>
                      {league.country.name}
                    </p>
                    <p className="p-0 m-0">{league.league.name}</p>
                  </div>
                </div>
              </td>
              <td style={{ verticalAlign: "middle" }}>{league.seasons?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
