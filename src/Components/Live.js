import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fixtures } from "../data.js";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Live = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // whether animation should happen only once
    });
  }, []);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fixtureData, setFixtureData] = useState(fixtures.response);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchFixturesByDate(selectedDate);
    }
  }, [selectedDate]);


  const fetchFixturesByDate = async (date) => {
    try {
      const response = await axios.get(`fixtures`);
      setFixtureData(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const leagues = [...new Set(fixtureData.map((match) => match.league.name))];

  const filteredFixtures = fixtureData.filter(
    (match) =>
      match.league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.teams.home.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.teams.away.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-3 text-light" style={{ minHeight: "100vh" }}>
      {/* Search and Date Filter */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control w-50 bg-dark"
          placeholder="Search team or league..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      {/* League Fixtures in Accordion */}
      <div className="accordion" id="fixturesAccordion">
        {leagues.slice(0, 15).map((league, index) => (
          <div key={index}>
            <div className="d-flex align-items-center p-2 bg-dark text-light" style={{ fontSize: "0.9rem", cursor: "default" }}>
              <img
                src={fixtureData.find((m) => m.league.name === league)?.league.logo}
                alt={league}
                width="25"
                className="me-2"
              />
              {league}
            </div>

            <table className="table-hover text-center mb-0 w-100">

              <tbody    >
                {filteredFixtures
                  .filter((match) => match.league.name === league)
                  .map((match) => (
                    <>
                    
                    <tr style={{textAlign:'start'}} >
                      {["1H", "2H", "ET"].includes(match.fixture.status?.short) && (
                            <span className="live-icon">● LIVE</span>
                          )}
                    </tr>
                    <tr key={match.fixture.id}

                      onClick={() => navigate(`/dashboard/single`)}
                      style={{ cursor: "pointer", fontSize: "0.85rem", borderBottom: '1px solid #ffffff1f' }}>
                      <td className="p-2 d-flex flex-column align-items-start gap-1">

                        {/* <tr>
                          {["1H", "2H", "ET"].includes(match.fixture.status?.short) && (
                            <span className="live-icon">● LIVE</span>
                          )}
                        </tr> */}

                        <tr>
                          <img src={match.teams.home.logo} alt={match.teams.home.name} width="20" className="me-2" />
                          <span>{match.teams.home.name}</span>
                        </tr>

                        <tr>
                          <img src={match.teams.away.logo} alt={match.teams.away.name} width="20" className="me-2" />
                          <span>{match.teams.away.name}</span>
                        </tr>


                      </td>
                      <td>
                        <tr>sa</tr>
                        <tr>sa</tr>
                      </td>
                    </tr>
                    </>
                  ))}
              </tbody>

            </table>

          </div>
        ))}
      </div>



    </div>
  );
};

export default Live;
