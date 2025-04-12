import React, { useState, useEffect } from "react";
import { fixtures } from "../data.js";

export default function Test() {


    const [fixtureData, setFixtureData] = useState(fixtures.response);

    useEffect(() => {
        console.log(fixtureData)
    })


    return (
        <div>

            {fixtureData.slice(0, 15).map((item, index) => (

                <div class="accordion bg-dark" id="accordion_${index}">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button bg-dark text-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <div className="d-flex flex-row align-items-center gap-2 " >
                                    <img src={item.league.logo} width="25" />
                                    <p className='m-0 text-light' >{item.league.name}</p>
                                </div>
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body p-0">
                                <table className="table table-dark table-sm table-hover text-center mb-0">
                                    <thead>
                                        <tr style={{ fontSize: "0.8rem" }}>
                                            <th>Match</th>
                                            <th>Score</th>
                                        </tr>

                                        <tbody>
                                            {item.teams.map((match) => (
                                                <tr
                                                    key={match.fixture.id}
                                                    // onClick={() => navigate(`/dashboard/single`)}
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
                                    </thead>

                                </table>
                            </div>
                        </div>
                    </div>

                </div>


            ))}
            {/* <div class="accordion bg-dark" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        This is the first item HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>

            </div> */}
        </div>
    )
}
