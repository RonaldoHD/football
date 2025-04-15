import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { singlefixture } from "../singleFixture.js";  // Importing the local file
import "bootstrap/dist/css/bootstrap.min.css";
import { RectangleVertical, ArrowLeftRight, Goal } from 'lucide-react';

const FixtureDetails = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

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

  const { fixture: match, league, teams, goals, score, events } = fixture;
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
        <p onClick={() => navigate(-1)} className="p-2 m-0">← Back</p>

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
                <p className="pb-3">{fixture.fixture.status.long}</p>

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
        <div className='w-100 bg-dark p-2 mb-4' >ODDS</div><div>
          
        </div>
      </div>



        {/* Pills Navigation */}
        <ul className="nav nav-pills mb-3" role="tablist">
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

            <div className="football-events-table">
              {events?.length > 0 && (
                <>
                  {[...new Set(events.map(e => e.team.name))].map((teamName) => {
                    const teamEvents = events.filter(e => e.team.name === teamName);
                    const teamLogo = teamEvents[0]?.team.logo;

                    return (
                      <div key={teamName} className="team-section mb-4">
                        <div className="bg-dark  d-flex align-items-center mb-2 p-2 w-100">
                          <img src={teamLogo} alt={teamName} width="24" className="me-2" />
                          <h5 className="m-0 text-neon">{teamName}</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table-hover mb-0 w-100">
                            <tbody>
                              {teamEvents.map((event, idx) => {
                                const detail = event.detail?.toLowerCase() || '';

                                return (
                                  <tr key={idx} className="event-row" style={{borderBottom:'1px solid #444444'}} >
                                    <td className="player-info py-2">
                                      <p className="m-0">{event.player.name}</p>
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







          {activeTab === 'profile' && (
            <div className="tab-pane fade show active">This is the Profile tab content.</div>
          )}
          {activeTab === 'contact' && (
            <div className="tab-pane fade show active">This is the Contact tab content.</div>
          )}
        </div>


    </div>
  );
};

export default FixtureDetails;
