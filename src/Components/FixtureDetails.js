import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftRight, Goal, RectangleVertical, ArrowUp, ArrowDown } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";

const FixtureDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const fixture_id = searchParams.get('fixture');

  const [fixture, setFixture] = useState(null);
  const [odds, setOdds] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [loadingFixture, setLoadingFixture] = useState(true);
  const [loadingOdds, setLoadingOdds] = useState(true);

  useEffect(() => {
    const fetchFixture = async () => {
      setLoadingFixture(true);
      try {
        const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixture_id}`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909', // Replace with your real key
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
          }
        });
        const data = await response.json();
        setFixture(data.response[0]);  // Correct way to access the object
      } catch (error) {
        console.error('Error fetching fixture:', error);
      }
      setLoadingFixture(false);
    };

    const fetchOdds = async () => {
      setLoadingOdds(true);
      try {
        const response = await fetch(`https://your-odds-api.com/fixture/${fixture_id}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer YOUR_ODDS_API_KEY' // Example
          }
        });
        const data = await response.json();
        setOdds(data.odds || []); // Adjust according to your odds API structure
      } catch (error) {
        console.error('Error fetching odds:', error);
      }
      setLoadingOdds(false);
    };

    fetchFixture();
    fetchOdds();
  }, [fixture_id]);

  if (loadingFixture) return <div className="text-center mt-5 text-light">Loading Fixture...</div>;

  if (!fixture) return <div className="text-center mt-5 text-light">Fixture not found.</div>;

  const { fixture: match, league, teams, goals, statistics, events, lineups, players } = fixture;

  const isLive = ['1H', '2H', 'ET'].includes(match.status.short);

  const date = new Date(match.date);

  const finalDate = date.toLocaleString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    hour12: false, timeZone: 'Europe/Berlin'
  }).replace(',', '');




  return (
    <div className="container mt-1 text-light">

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

          <div className="football-events-table" style={{ marginBottom: '6rem' }}>
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
          <div className="p-1" style={{ marginBottom: '6rem' }}>
            <h4 className="text-center mb-4 text-lg font-semibold">Lineups</h4>

            <div className="pitch-container overflow-x-auto">

              <div className="pitch-lines">
                <div className="center-circle"></div>
                <div className="penalty-box top"></div>
                <div className="penalty-box bottom"></div>
                <div className="goal-box top"></div>
                <div className="goal-box bottom"></div>
              </div>

              <div className="pitch grid grid-cols-1 md:grid-cols-2 gap-2">
                {[0, 1].map((teamIndex) => {
                  const team = lineups[teamIndex];
                  const formation = team.formation.split('-').map(n => parseInt(n));
                  const playersPos = [...team.startXI.map(p => p.player)];
                  const goalkeeper = playersPos.shift();

                  const lines = [];
                  let start = 0;
                  formation.forEach(count => {
                    lines.push(playersPos.slice(start, start + count));
                    start += count;
                  });

                  const displayLines = teamIndex === 1 ? [...lines].reverse() : lines;

                  // Fix: Find player's photo from full player list
                  const findPlayerPhoto = (playerId) => {
                    console.log(players)
                    for (const team of players) {
                      const match = team.players.find(p => p.player.id === playerId);
                      if (match) return match.player.photo;
                    }
                    return 'https://via.placeholder.com/40'; // fallback image
                  };





                  return (
                    <div key={teamIndex} className={`team-side team-${teamIndex} flex flex-col items-center gap-2`}>
                      {teamIndex === 0 ? (
                        <>
                          <div className="line flex justify-center gap-1 mb-2">
                            <img
                              src={findPlayerPhoto(goalkeeper.id)} height={40}
                              alt={goalkeeper.name}
                              className=" rounded-circle p-1"
                            />
                          </div>
                          {displayLines.map((line, i) => (
                            <div key={i} className="line flex justify-center gap-1 mb-2">
                              {line.map(player => (
                                <img
                                  key={player.id} height={40}
                                  src={findPlayerPhoto(player.id)}
                                  alt={player.name}
                                  className=" rounded-circle p-1"
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
                                  key={player.id} height={40}
                                  src={findPlayerPhoto(player.id)}
                                  alt={player.name}
                                  className=" rounded-circle p-1"
                                />
                              ))}
                            </div>
                          ))}
                          <div className="line flex justify-center gap-1 mt-2">
                            <img
                              src={findPlayerPhoto(goalkeeper.id)} height={40}
                              alt={goalkeeper.name}
                              className="rounded-circle p-1"
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
          <div className="football-events-table" style={{ marginBottom: '6rem' }}>
            <div className="d-flex flex-wrap justify-content-between gap-3">
              {/* Left Team */}
              <div className="team-section" style={{ flex: '1 1 48%' }}>
                <div className="bg-dark d-flex align-items-center mb-2 p-2 w-100">
                  <img src={players[0].team.logo} alt={players[0].team.name} width="24" className="me-2" loading="lazy" />
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
          <div className="football-events-table" style={{ marginBottom: '6rem' }}>
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
