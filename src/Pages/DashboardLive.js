import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from '../Components/Navbar.js';
import MobileNav from '../Components/MobileNav.js';
import { Star } from 'lucide-react';
import { useFavorites } from '../Script';

import CompetitionSkeleton from '../Components/CompetitionSkeleton.js'



export default function DasboardLive() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  const [fixtureData, setFixtureData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFixturesByDate();
  }, []);

  const fetchFixturesByDate = async () => {
    setLoading(true)
    const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setLoading(false)
      setFixtureData(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  // Group fixtures by league
  const groupedFixtures = fixtureData.reduce((groups, match) => {
    const leagueName = match.league.name;
    if (!groups[leagueName]) groups[leagueName] = [];
    groups[leagueName].push(match);
    return groups;
  }, {});

  // Filter matches by search term
  const filteredGroupedFixtures = Object.entries(groupedFixtures).filter(
    ([league, matches]) =>
      league.toLowerCase().includes(searchTerm.toLowerCase()) ||
      matches.some(
        (match) =>
          match.teams.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.teams.away.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );



  return (
    <div>
      <Navbar />
      <div className="container mt-3 text-light" style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-100 m-1 bg-dark"
            placeholder="Search team or league..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


{loading ? <CompetitionSkeleton/> : 
       
        <div className="accordion" id="fixturesAccordion">
          {filteredGroupedFixtures.map(([leagueName, matches], index) => (
            <div key={index}>
              <div className="d-flex align-items-center p-2 bg-dark text-light" style={{ fontSize: "0.9rem" }}>
                <img
                  src={matches[0].league.logo}
                  alt={leagueName}
                  width="25"
                  className="me-2"
                />
                {leagueName}
              </div>

              <table className="table-hover text-center mb-0 w-100">
                <tbody>
                  {matches.map((match) => {
                    const isFav = isFavorite(match.fixture?.id);

                    return (

                      <tr
                        key={match.fixture?.id}
                        style={{
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          borderBottom: "1px solid #ffffff1f",
                        }}
                      >
                        <td onClick={() => toggleFavorite(match)}>
                          {isFav ? (
                            <Star fill="var(--text-red)" color="var(--text-red)" size={18} />
                          ) : (
                            <Star size={18} />
                          )}
                        </td>

                        <td
                          className="p-2 d-flex flex-column align-items-start gap-1"
                          onClick={() =>
                            navigate(`/dashboard/single?fixture=${match.fixture?.id}`)
                          }
                        >
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={match.teams?.home.logo}
                              alt={match.teams?.home.name}
                              width="20"
                            />
                            <span>{match.teams?.home.name}</span>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={match.teams?.away.logo}
                              alt={match.teams?.away.name}
                              width="20"
                            />
                            <span>{match.teams?.away.name}</span>
                          </div>
                        </td>


                        <td>

                          <div className="d-flex flex-row gap-2 justify-content-center align-items-center" >
                            <span className="bg-danger"
                              style={{ animation: 'pulse 1s infinite', borderRadius: '5px', padding: '2px 5px' }} >
                              {match.fixture.status.elapsed}'</span>
                            <span className="badge badge-danger" style={{ border: '1px solid white' }}>
                              {match.fixture?.status?.long === "Match Finished" ? "Finished" : match.fixture?.status?.long}
                            </span>
                          </div>


                        </td>

                        <td>
                          <div style={{ color: "var(--text-red)", fontWeight: "600" }}>
                            {match?.goals?.home !== null ? match?.goals?.home : "-"}
                          </div>
                          <div style={{ color: "var(--text-red)", fontWeight: "600" }}>
                            {match?.goals?.away !== null ? match?.goals?.away : "-"}
                          </div>
                        </td>

                        <td>
                          <div>-</div>
                          <div>-</div>
                          <div>-</div>
                        </td>
                      </tr>


                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div> }



      </div>
      <MobileNav />
    </div>
  );
}
