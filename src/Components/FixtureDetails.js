import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { singlefixture } from "../singleFixture.js";  // Importing the local file
import "bootstrap/dist/css/bootstrap.min.css";

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
              <td
                style={{
                  fontSize: '1.8rem',
                  fontWeight: '800',
                  color: 'white',
                  verticalAlign: 'middle',
                  padding: '1rem 0.5rem',
                }}
              >
                {goals.home} - {goals.away}
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

          <tfoot>
            <tr style={{ borderTop: '1px solid #444' }}>
              <td colSpan="3" className="text-start text-light p-3">
                {new Date(match.date).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>



      <div className="container mt-4">
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
        <div className="tab-content p-1 border rounded ">
          {activeTab === 'events' && (
            <div className="tab-pane fade show active">
              {events?.length > 0 && (
               
                  <ul className="list-group list-group-flush">
                    {events.map((event, idx) => (
                      <li key={idx} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                        <div>
                          <img src={event.team.logo} alt={event.team.name} width="20" className="me-2" />
                          <strong>{event.team.name}</strong> - {event.player.name}
                          {event.detail && <> ({event.detail})</>}
                        </div>
                        <span>{event.time.elapsed}'</span>
                      </li>
                    ))}
                  </ul>
              
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



      {/* Match Events */}
      {/* {events?.length > 0 && (
        <div className="card bg-secondary mb-4">
          <div className="card-header">
            <strong>Match Events</strong>
          </div>
          <ul className="list-group list-group-flush">
            {events.map((event, idx) => (
              <li key={idx} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center">
                <div>
                  <img src={event.team.logo} alt={event.team.name} width="20" className="me-2" />
                  <strong>{event.team.name}</strong> - {event.player.name}
                  {event.detail && <> ({event.detail})</>}
                </div>
                <span>{event.time.elapsed}'</span>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default FixtureDetails;
