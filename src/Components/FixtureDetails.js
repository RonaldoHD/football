import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { singlefixture } from "../singleFixture.js";  // Importing the local file
import "bootstrap/dist/css/bootstrap.min.css";
import { PlayerCard } from "./PlayerCard.js";
import { RectangleVertical, ArrowLeftRight, Goal, ArrowDown, ArrowUp } from 'lucide-react';

const FixtureDetails = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');

  useEffect(() => {
    const fetchFixture = async () => {
      try {
        // If you're using local data for now, simulate the fetch like this
        const response = singlefixture.response[0];  // Replace this with a real API call later
        console.log(response)
        setFixture(response || null);
      } catch (err) {
        console.error("Error fetching fixture:", err);
      }
    };

    fetchFixture();
  }, [id]);



  if (!fixture) return <div className="text-center mt-5 text-light">Loading...</div>;

  const { fixture: match, league, teams, goals, statistics, events, lineups, players } = fixture;
  const isLive = match.status.short === "1H" || match.status.short === "2H" || match.status.short === "ET";




  const date = new Date(match.date);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Berlin'
  };

  const parts = date.toLocaleString('en-GB', options).split(', ');
  const [day, month, year] = parts[0].split('/');
  const time = parts[1];

  const finalDate = `${day}.${month}.${year} ${time}`;






  return (
    <div className="container mt-1 text-light">







      {/* <div>
        <div>
          <img src={league.logo} alt={league.name} width="25" className="me-2" />
          {league.name} - {league.round}
        </div>
        {isLive && (
          <span className="badge bg-danger p-2" style={{ animation: "pulse 1s infinite" }}>
            🔴 LIVE
          </span>
        )}
        <p>{new Date(match.date).toLocaleString()}</p>

        <div className="d-flex flex-row justify-content-between" >
          <div>
            <img src={teams.home.logo} alt={teams.home.name} width="70" style={{ background: 'white', borderRadius: '5px', padding: '7px' }} />
            <p>{teams.home.name}</p>
          </div>

          <h2>{goals.home} - {goals.away}</h2>

          <div>
            <img src={teams.away.logo} alt={teams.away.name} width="70" style={{ background: 'white', borderRadius: '5px', padding: '7px' }} />
            <p>{teams.away.name}</p>
          </div>


        </div>
      </div> */}

      <div className="table-responsive">
        {/* <p onClick={() => navigate(-1)} className="p-2 m-0">← Back</p> */}

        <table
          className="table table-hover align-middle text-center"
          style={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse' }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid #444' }}>
              <th colSpan="3" className="text-start text-light p-3">
                <img src={league.logo} alt={league.name} width="25" className="me-2" />
                {league.name} - {league.round}
                {isLive && (
                  <span
                    className="badge bg-danger ms-3"
                    style={{ animation: 'pulse 1s infinite' }}
                  >
                    🔴 LIVE
                  </span>
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr style={{ borderBottom: '1px solid #444' }}>
              {/* Home Team */}
              <td className="text-light p-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={teams.home.logo}
                    alt={teams.home.name}
                    width="50"
                    className="bg-white rounded p-2 mb-2"
                  />
                  <div>{teams.home.name}</div>
                </div>
              </td>

              {/* Score */}
              <td style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'white',
                verticalAlign: 'middle',
                padding: '1rem 0.5rem',
              }}>
                <p style={{ color: '#ffffff3b', fontWeight: '400', padding: 0 }} >{finalDate}</p>
                <div >{goals.home} - {goals.away}</div>
                <p className="pb-1">{fixture.fixture.status.long}</p>

              </td>

              {/* Away Team */}
              <td className="text-light p-3">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={teams.away.logo}
                    alt={teams.away.name}
                    width="50"
                    className="bg-white rounded p-2 mb-2"
                  />
                  <div>{teams.away.name}</div>
                </div>
              </td>
            </tr>
          </tbody>


        </table>
      </div>


      <div>
        <div className='w-100 bg-dark p-2' >ODDS</div>

        <div className='d-flex flex-row justify-content-between gap-2 mb-4 p-3'>
          <div className='odd' >1    <div><ArrowUp strokeWidth={'3px'} color='green' /> 2.20</div></div>
          <div className='odd' >1    <div><ArrowUp strokeWidth={'3px'} color='red' /> 2.20</div></div>
          <div className='odd' >1    <div><ArrowUp strokeWidth={'3px'} color='red' /> 2.20</div></div>
        </div>
      </div>



      {/* Pills Navigation */}
      <ul className="nav nav-pills mb-2" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'lineups' ? 'active' : ''}`}
            onClick={() => setActiveTab('lineups')}
          >
            Lineups
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'players' ? 'active' : ''}`}
            onClick={() => setActiveTab('players')}
          >
            Players
          </button>
        </li>

        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
        </li>

      </ul>

      {/* Pills Content */}
      <div className="tab-content rounded ">




        {activeTab === 'events' && (

          <div className="football-events-table"  style={{marginBottom:'6rem'}}>
            {events?.length > 0 && (
              <>
                {[...new Set(events.map(e => e.team.name))].map((teamName) => {
                  const teamEvents = events.filter(e => e.team.name === teamName);
                  const teamLogo = teamEvents[0]?.team.logo;

                  return (
                    <div key={teamName} className="team-section mb-4">
                      <div className="bg-dark  d-flex align-items-center mb-2 p-2 w-100">
                        <img src={teamLogo} alt={teamName} width="24" className="me-2" />
                        <p className="m-0 text-neon">{teamName}</p>
                      </div>
                      <div className="table-responsive">
                        <table className="table-hover mb-0 w-100">
                          <tbody>
                            {teamEvents.map((event, idx) => {
                              const detail = event.detail?.toLowerCase() || '';

                              return (
                                <tr key={idx} className="event-row" style={{ borderBottom: '1px solid #444444' }} >
                                  <td className="player-info py-2">
                                    <p className="m-0" style={{ paddingLeft: '10px' }}>{event.player.name}</p>
                                  </td>

                                  <td className="detail-info">
                                    {detail.includes('yellow') ? (
                                      <span className="neon-badge yellow">🟨 Card</span>
                                    ) : detail.includes('red') ? (
                                      <span className="neon-badge red">🟥 Card</span>
                                    ) : detail.includes('goal') ? (
                                      <span className="text-success d-flex align-items-center">
                                        <Goal color="green" strokeWidth="1px" className="me-1" />
                                      </span>
                                    ) : detail.includes('substitution') ? (
                                      <span className="d-flex align-items-center">
                                        <ArrowLeftRight color="white" strokeWidth="1px" className="me-1" />
                                      </span>
                                    ) : (
                                      <span className="text-muted d-flex align-items-center">
                                        <RectangleVertical className="me-1" />
                                        {event.detail || '-'}
                                      </span>
                                    )}
                                  </td>

                                  <td className="time-info">
                                    <p className="m-0">{event.time.elapsed}'</p>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>

                        </table>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

        )}



        {activeTab === 'lineups' && (
          <div className="p-1"  style={{marginBottom:'6rem'}}>
            <h4 className="text-center mb-4 text-lg font-semibold">Lineups</h4>

            <div className="pitch-container overflow-x-auto">
              <div className="pitch grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                {[0, 1].map((teamIndex) => {
                  const team = lineups[teamIndex];
                  const formation = team.formation.split('-').map(n => parseInt(n));
                  const players = [...team.startXI.map(p => p.player)];
                  const goalkeeper = players.shift();

                  const lines = [];
                  let start = 0;
                  formation.forEach(count => {
                    lines.push(players.slice(start, start + count));
                    start += count;
                  });

                  const displayLines = teamIndex === 1 ? [...lines].reverse() : lines;

                  // Fix: Find player's photo from full player list
                  const findPlayerPhoto = (team, id) => {

                    // const found = team.players.find(p => p.player.id === id);
                    // return found ? found.player.photo : null;
                  };

                  return (
                    <div key={teamIndex} className={`team-side team-${teamIndex} flex flex-col items-center gap-2`}>
                      {teamIndex === 0 ? (
                        <>
                          <div className="line flex justify-center gap-1 mb-2">
                            <img
                              src={findPlayerPhoto(team, goalkeeper.id)}
                              alt={goalkeeper.name}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-blue-500"
                            />
                          </div>
                          {displayLines.map((line, i) => (
                            <div key={i} className="line flex justify-center gap-1 mb-2">
                              {line.map(player => (
                                <img
                                  key={player.id}
                                  src={findPlayerPhoto(team, player.id)}
                                  alt={player.name}
                                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-blue-400"
                                />
                              ))}
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {displayLines.map((line, i) => (
                            <div key={i} className="line flex justify-center gap-1 mb-2">
                              {line.map(player => (
                                <img
                                  key={player.id}
                                  src={findPlayerPhoto(team, player.id)}
                                  alt={player.name}
                                  className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-red-400"
                                />
                              ))}
                            </div>
                          ))}
                          <div className="line flex justify-center gap-1 mt-2">
                            <img
                              src={findPlayerPhoto(team, goalkeeper.id)}
                              alt={goalkeeper.name}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-red-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}



        {activeTab === 'players' && players?.length === 2 && (
          <div className="football-events-table"  style={{marginBottom:'6rem'}}>
            <div className="d-flex flex-wrap justify-content-between gap-3">
              {/* Left Team */}
              <div className="team-section" style={{ flex: '1 1 48%' }}>
                <div className="bg-dark d-flex align-items-center mb-2 p-2 w-100">
                  <img src={players[0].team.logo} alt={players[0].team.name} width="24" className="me-2" />
                  <p className="m-0 text-neon">{players[0].team.name}</p>
                </div>
                <div className="table-responsive">
                  <table className="table-hover mb-0 w-100">
                    <tbody>
                      {players[0].players.map((playerObj, idx) => {
                        const player = playerObj.player;
                        return (
                          <tr key={idx} className="event-row" >
                            <td className="player-info py-2 d-flex align-items-center">
                              <img
                                src={player.photo}
                                alt={player.name}
                                width="34"
                                className="me-2 rounded-circle p-1"
                              />
                              <p className="m-0">{player.name}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Team */}
              <div className="team-section" style={{ flex: '1 1 48%' }}>
                <div className="bg-dark d-flex align-items-center mb-2 p-2 w-100">
                  <img src={players[1].team.logo} alt={players[1].team.name} width="24" className="me-2" />
                  <p className="m-0 text-neon">{players[1].team.name}</p>
                </div>
                <div className="table-responsive">
                  <table className="table-hover mb-0 w-100">
                    <tbody>
                      {players[1].players.map((playerObj, idx) => {
                        const player = playerObj.player;
                        return (
                          <tr key={idx} className="event-row" >
                            <td className="player-info py-2 d-flex align-items-center">
                              <img
                                src={player.photo}
                                alt={player.name}
                                width="34"
                                className="me-2 rounded-circle p-1"
                              />
                              <p className="m-0">{player.name}</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'statistics' && (
          <div className="football-events-table"  style={{marginBottom:'6rem'}}>
            {statistics?.length === 2 && (
              <div className="stats-comparison w-100">
                {statistics[0].statistics.map((stat, idx) => {
                  const statType = stat.type;

                  const team1Stat = statistics[0].statistics.find(s => s.type === statType);
                  const team2Stat = statistics[1].statistics.find(s => s.type === statType);

                  const value1 = team1Stat?.value ?? 0;
                  const value2 = team2Stat?.value ?? 0;

                  const getNumeric = val => {
                    if (val === null) return 0;
                    if (typeof val === 'string' && val.includes('%')) return parseInt(val.replace('%', ''));
                    if (!isNaN(val)) return Number(val);
                    return 0;
                  };

                  const num1 = getNumeric(value1);
                  const num2 = getNumeric(value2);
                  const total = num1 + num2 || 1;

                  const leftPercent = (num1 / total) * 100;
                  const rightPercent = (num2 / total) * 100;

                  return (
                    <div key={idx} className="stat-row py-2" style={{ borderBottom: '1px solid #333' }}>
                      <div className="d-flex align-items-center justify-content-between text-light mb-1 px-2">
                        <span style={{ width: '80px', textAlign: 'left' }}>{value1}</span>
                        <span style={{ flex: 1, textAlign: 'center', color: '#999' }}>{statType}</span>
                        <span style={{ width: '80px', textAlign: 'right' }}>{value2}</span>
                      </div>
                      <div className="d-flex align-items-center px-2">
                        <div className="progress bg-dark" style={{ height: '6px', width: '48%', marginRight: '4%' }}>
                          <div
                            className="progress-bar bg-danger"
                            style={{ width: `${leftPercent}%` }}
                          ></div>
                        </div>
                        <div className="progress bg-dark" style={{ height: '6px', width: '48%' }}>
                          <div
                            className="progress-bar bg-light"
                            style={{ width: `${rightPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}




      </div>


    </div>
  );
};

export default FixtureDetails;
