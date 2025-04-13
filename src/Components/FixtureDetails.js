import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { singlefixture } from "../singleFixture.js";  // Importing the local file
import "bootstrap/dist/css/bootstrap.min.css";

const FixtureDetails = () => {
  const { id } = useParams();
  const [fixture, setFixture] = useState(null);
  const navigate = useNavigate();

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
    <div className="container mt-4 text-light">
      <button onClick={() => navigate(-1)} className="btn btn-outline-light mb-3">← Back</button>



      <div className="card-header d-flex align-items-center justify-content-between">
        <div>
          <img src={league.logo} alt={league.name} width="25" className="me-2" />
          {league.name} - {league.round}
        </div>
        {isLive && (
          <span className="badge bg-danger p-2" style={{ animation: "pulse 1s infinite" }}>
            🔴 LIVE
          </span>
        )}
      </div>



      {/* <div className="card bg-dark text-white mb-4">

        <div className="card-body text-center">
          <p>{new Date(match.date).toLocaleString()}</p>

          <div className="row" >
            <div className="col-sm-5" >
              <img src={teams.home.logo} alt={teams.home.name} width="70" style={{background:'white' , borderRadius:'5px' , padding:'7px'}} />
              <p>{teams.home.name}</p>
            </div>

            <div className="col-sm-2" >
              <h2>{goals.home} - {goals.away}</h2>
            </div>

            <div className="col-sm-5">
              <img src={teams.away.logo} alt={teams.away.name} width="70" style={{background:'white' , borderRadius:'5px' , padding:'7px'}} />
              <p>{teams.away.name}</p>
            </div>
          </div>



          <p className="mt-2">
            {match.status.long} <br></br>{match.referee || "N/A"}
          </p>
        </div>


      </div> */}



      <div>
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
      </div>


      {/* Match Events */}
      {events?.length > 0 && (
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
      )}
    </div>
  );
};

export default FixtureDetails;
