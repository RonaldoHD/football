import React, { useEffect, useState } from 'react';
import MobileNav from '../Components/MobileNav';
import Navbar from '../Components/Navbar';
import { Star } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../Script';


export default function SingleLeague() {

  const { toggleFavorite, isFavorite } = useFavorites();

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const league = searchParams.get('league');
  const date = searchParams.get('date');


  const [League, setLeague] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    console.log(league)
    const fetchLeague = async () => {
      const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league}&season=2024&date=${date}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '59a8fb1369mshb1757809560a70fp1fd523jsn406a21445909',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
      };

      try {
        setLoading(true)
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setLeague(data.response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeague();

  }, [league]);





  return (
    <div>
      <Navbar />

      {loading ? (<div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>) : (

        <section className="container">
          {League.length > 0 && (
            <div className="d-flex align-items-center p-2 bg-dark text-light" style={{ fontSize: "0.9rem", cursor: "default" }}>
              <img
                src={League[0]?.league.logo}
                alt={League[0]?.league.name}
                width="25"
                className="me-2"
              />
              {League[0]?.league.name}
            </div>
          )}



          <table className="table-hover text-center mb-0 w-100">
            <tbody>
              {League.map((match) => {
                const isFav = isFavorite(match.fixture.id); // ✅ Declare here, outside of JSX

                return (
                  <tr
                    key={match.fixture.id}
                    onClick={() => toggleFavorite(match)}
                    style={{
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      borderBottom: "1px solid #ffffff1f",
                    }}
                  >
                    <td>
                      {isFav ? (
                        <Star fill="var(--text-red)" color="var(text-red)" size={18} />
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
                );
              })}
            </tbody>
          </table>

        </section>)}

      <MobileNav />
    </div>
  );
}
