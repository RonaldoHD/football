import React, { useState, useEffect } from "react";
import Navbar from '../Components/Navbar.js'
import MobileNav from '../Components/MobileNav.js'
import { HeartOff, ArrowLeftFromLine } from 'lucide-react';

import { Star } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from "../Script.js";

export default function Favorites() {

    const { toggleFavorite, isFavorite } = useFavorites();



    const navigate = useNavigate();

    const [League, setLeague] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLeague(JSON.parse(localStorage.getItem("favorites") || "[]"))
    }, []);


    return (
        <div>
            <Navbar />

            {League.length === 0 ? (


                <section>
                    <h2 className="p-2">Favorites</h2>

                    <div className="d-flex flex-column align-items-center my-5" >
                        <HeartOff size={60} color="var( --text-blue)" />
                        <h3>No Favorites</h3>
                        <p>Go to dashboard and add a game to favorites</p>
                        <a href="/dashboard/matches" style={{ textDecoration: 'none' }}>
                            <ArrowLeftFromLine /> See Matches</a>
                    </div>

                </section>
            ) : (
                <section className="container">
                {League.map((match, index) => {
                  const isFav = isFavorite(match.fixture.id); // ✅ Declare here
              
                  return (
                    <div key={match.fixture.id}> {/* 👈 Wrap div + table in a parent */}
                      <div
                        className="d-flex align-items-center p-2 bg-dark text-light"
                        style={{ fontSize: "0.9rem", cursor: "default" }}
                      >
                        <img
                          src={match.league.logo}
                          alt={match.league.name}
                          width="25"
                          className="me-2"
                        />
                        {match.league.name}
                      </div>
              
                      <table className="table-hover text-center mb-0 w-100">
                        <tbody>
                          <tr
                            onClick={() => toggleFavorite(match)}
                            style={{
                              cursor: "pointer",
                              fontSize: "0.85rem",
                              borderBottom: "1px solid #ffffff1f",
                            }}
                          >
                            <td>
                              {isFav ? (
                                <Star fill="var(--text-red)" color="var(--text-red)" size={18} />
                              ) : (
                                <Star size={18} />
                              )}
                            </td>
              
                            <td
                              className="p-2 d-flex flex-column align-items-start gap-1"
                              onClick={() =>
                                navigate(`/dashboard/single?fixture=${match.fixture.id}`)
                              }
                            >
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={match.teams.home.logo}
                                  alt={match.teams.home.name}
                                  width="20"
                                />
                                <span>{match.teams.home.name}</span>
                              </div>
              
                              <div className="d-flex align-items-center gap-2">
                                <img
                                  src={match.teams.away.logo}
                                  alt={match.teams.away.name}
                                  width="20"
                                />
                                <span>{match.teams.away.name}</span>
                              </div>
                            </td>
              
                            <td
                              onClick={() =>
                                navigate(`/dashboard/single?fixture=${match.fixture.id}`)
                              }
                            >
                              <span className="badge">
                                {match.fixture.status.long === "Match Finished"
                                  ? "Finished"
                                  : match.fixture.status.long}
                              </span>
                            </td>
              
                            <td>
                              <div style={{ color: "var(--text-red)", fontWeight: "600" }}>
                                {match.goals.home !== null ? match.goals.home : "-"}
                              </div>
                              <div style={{ color: "var(--text-red)", fontWeight: "600" }}>
                                {match.goals.away !== null ? match.goals.away : "-"}
                              </div>
                            </td>
              
                            <td>
                              <div>-</div>
                              <div>-</div>
                              <div>-</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </section>
              
           

            )}





            <MobileNav />
        </div>
    )
}
