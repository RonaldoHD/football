import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const FixturesPage = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [fixtureData, setFixtureData] = useState(fixtures.response);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      fetchFixturesByDate(selectedDate);
    }
  }, [selectedDate]);

  // const fetchFixturesByDate = async (date) => {
  //   try {
  //     const response = await axios.get(`https://api.football-data.com/fixtures?date=${date}`);
  //     setFixtureData(response.data.response);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


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
          className="form-control w-100"
          placeholder="Search team or league..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="form-control w-25"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* League Fixtures in Accordion */}


      {leagues.slice(0, 15).map((league, index) => (
        <div className="accordion" id="fixturesAccordion">

          <div className=" mb-1 mt-3 " key={index}>
            <h2 className="accordion-header">
              <div className="d-flex align-items-center gap-2 p-2 bg-dark text-light" style={{ fontSize: "0.9rem", cursor: "default" }}>
                <img
                  src={fixtureData.find((m) => m.league.name === league)?.league.logo}
                  alt={league}
                  width="25"
                  className="me-2"
                />
                {league}
              </div>
            </h2>

            <div className="accordion-body p-0 text-light">
              <table className="table table-dark table-sm table-hover text-center mb-0 ">

                <tbody>
                  {filteredFixtures
                    .filter((match) => match.league.name === league)
                    .map((match) => (
                      <tr class="table-primary"
                        key={match.fixture.id}
                        onClick={() => navigate(`/dashboard/single`)}
                        style={{ cursor: "pointer", fontSize: "0.85rem" }}
                      >
                        <td className="d-flex flex-column align-items-start gap-2 p-2 ">

                          <div>

                            {["1H", "2H", "ET"].includes(match.fixture.status?.short) && (
                              <span className="live-icon">● LIVE</span>
                            )}
                          </div>

                          <div className="d-flex flex-row justify-content-between align-items-center mb-1  w-100">
                            <div>
                            <img src={match.teams.home.logo} alt={match.teams.home.name} width="20" className="me-2" />
                            <span className="text-light" >{match.teams.home.name}</span>
                            </div>
                            <span className="text-light" >{match.goals.home}</span>

                          </div>

                          <div className="d-flex flex-row align-items-center justify-content-between w-100">
                            <div>
                              <img src={match.teams.away.logo} alt={match.teams.away.name} width="20" className="me-2" />
                              <span className="text-light" >{match.teams.away.name}</span>
                            </div>
                            <span className="text-light" >{match.goals.away}</span>
                          </div>

                        </td>
                        {/* <td>
                          <strong className="text-light" >{match.goals.home} - {match.goals.away}</strong>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}





      {/* <div className="accordion" id="fixturesAccordion">
        {leagues.slice(0, 15).map((league, index) => (
          <div className=" mb-1 mt-3 " key={index}>
            <h2 className="accordion-header">
              <div className="d-flex align-items-center gap-2 p-2 bg-dark text-light" style={{ fontSize: "0.9rem", cursor: "default" }}>
                <img
                  src={fixtureData.find((m) => m.league.name === league)?.league.logo}
                  alt={league}
                  width="25"
                  className="me-2"
                />
                {league}
              </div>
            </h2>

            <div className="accordion-body p-0 text-light">
              <table className="table table-dark table-sm table-hover text-center mb-0 ">
                
                <tbody>
                  {filteredFixtures
                    .filter((match) => match.league.name === league)
                    .map((match) => (
                      <tr class="table-primary"
                        key={match.fixture.id}
                        onClick={() => navigate(`/dashboard/single`)}
                        style={{ cursor: "pointer", fontSize: "0.85rem" }}
                      >
                        <td className="d-flex flex-column align-items-start gap-2">

                          <div>
                          
                            {["1H", "2H", "ET"].includes(match.fixture.status?.short) && (
                              <span className="live-icon">● LIVE</span>
                            )}
                          </div>

                          <div className="d-flex align-items-center mb-1">
                            <img src={match.teams.home.logo} alt={match.teams.home.name} width="20" className="me-2" />
                            <span>{match.teams.home.name}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <img src={match.teams.away.logo} alt={match.teams.away.name} width="20" className="me-2" />
                            <span>{match.teams.away.name}</span>
                          </div>
                        </td>
                        <td>
                          <strong>{match.goals.home} - {match.goals.away}</strong>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div> */}



    </div>
  );
};

export default FixturesPage;
