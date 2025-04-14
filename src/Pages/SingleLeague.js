import React, { useEffect, useState } from 'react'
import MobileNav from '../Components/MobileNav'

import { singleLeague } from '../singleLeague'

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../Components/Navbar';



export default function SingleLeague() {
  const navigate = useNavigate();


  const [League, setleague] = useState([]);

  console.log(singleLeague)

  useEffect(() => {
    setleague(singleLeague.response)
  })


  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // whether animation should happen only once
    });
  }, []);


  return (
    <div>
      <Navbar />


      <div className="d-flex align-items-center p-2 bg-dark text-light" style={{ fontSize: "0.9rem", cursor: "default" }}>
        <img
          src={League[0]?.league.logo}
          alt={League[0]?.league.name}
          width="25"
          className="me-2"
        />
        {League[0]?.league.name}
      </div>
      <table className="table-hover text-center mb-0 w-100">




        <tbody    >
          {League.map((match) => (
            <>
              <tr data-aos="fade-in" onClick={() => navigate('/dashboard/single')}
                key={match.fixture.id}
                style={{ cursor: "pointer", fontSize: "0.85rem", borderBottom: '1px solid #ffffff1f' }}>
                <td className="p-2 d-flex flex-column align-items-start gap-1">
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
                  <tr style={{ color: 'var(--text-red)' }} >{match.goals.home}</tr>
                  <tr style={{ color: 'var(--text-red)' }} >{match.goals.away}</tr>
                </td>
              </tr>
            </>
          ))}
        </tbody>

      </table>
      <MobileNav />
    </div>
  )
}
