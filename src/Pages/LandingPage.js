import { Link } from "react-router-dom";
import { ArrowRight, Globe, Zap, Clock, TrendingUp, Award, Heart, CheckCircle, Users, Shield } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import { button } from "react-bootstrap";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";




const LandingPage = () => {

    const featuredMatches = [
        {
          homeTeam: {
            name: "Barcelona",
            logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
            score: 2,
          },
          awayTeam: {
            name: "Real Madrid",
            logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
            score: 1,
          },
          matchTime: "20:00",
          status: "live",
          elapsed: "67",
        },
        {
          homeTeam: {
            name: "Arsenal",
            logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
            score: 0,
          },
          awayTeam: {
            name: "Liverpool",
            logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
            score: 0,
          },
          matchTime: "18:30",
          status: "upcoming",
        },
        {
            homeTeam: {
              name: "Barcelona",
              logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
              score: 2,
            },
            awayTeam: {
              name: "Real Madrid",
              logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
              score: 1,
            },
            matchTime: "20:00",
            status: "live",
            elapsed: "67",
          },
      ];
      

    return (
        <div>
            <Navbar />
            <div className="container-fluid  min-vh-100">

                <section className=" py-5  text-white">
                    <div className="container">
                        <h1 className="display-4 fw-bold">Stay Connected to <br></br> <span style={{ color: 'var(--text-blue)' }} >Every Match, Every Moment</span> </h1>
                        <p >Track live scores, statistics, and updates from football leagues around the world. Track live scores, statistics, and updates from football leagues around the world with our cutting-edge scoreboard platform.</p>
                        <div className="d-flex  gap-3 mt-4">
                            <button className="btn btn-outline-primary" variant="light" as={Link} to="/dashboard/matches">Launch Dashboard</button>
                            <button className="btn btn-outline-primary" variant="outline-light" href="#features">Explore Features</button>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <h2 className="fw-bold">Featured Matches</h2>
                        <p>Stay updated with the most exciting football matches happening right now</p>
                     
                        <div className="row g-4">
                            {featuredMatches.map((match, index) => (
                                <div className="col-md-6 col-lg-4" key={index}>

                                    <div className="home_match_card" >
                                        <div className="d-flex flex-row justify-content-between" >
                                            <p>{match.status}</p>

                                        </div>

                                        <div className="row" >
                                            <div className="col-lg-4" >
                                            <div className="d-flex flex-column align-items-center justofy-content-center" >

                                                    <img style={{height:'60px'}} src={match.homeTeam.logo} />
                                                    <h5>{match.homeTeam.name}</h5>
                                                </div>
                                            </div>

                                            <div className="col-lg-4" >
                                                <h2 className="text-center" >{match.homeTeam.score}:{match.awayTeam.score}</h2>
                                            </div>

                                            <div className="col-lg-4" >
                                                <div className="d-flex flex-column align-items-center justofy-content-center" >
                                                    <img style={{height:'60px'}} src={match.awayTeam.logo} />
                                                    <h5>{match.awayTeam.name}</h5>
                                                </div>
                                            </div>

                                        </div>

                                    </div>


                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <Link to="/dashboard" className="btn btn-link text-primary">View All Matches <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </section>



                <section>
                    <div className="container" >
                        <div className="row" >
                            <div className="col-lg-4" >
                                <div className="feature" >
                                    <Globe size={65} className="feature-icon p-2" style={{ borderRadius: '15px' }} ></Globe>
                                    <h2 className="text-light mt-3">Global Coverage</h2>
                                    <p className="text-light" >Track matches from over 100 leagues worldwide</p>
                                </div>
                            </div>
                            <div className="col-lg-4" >
                                <div className="feature" >
                                    <Zap size={65} className="feature-icon p-2" style={{ borderRadius: '15px' }} ></Zap>
                                    <h2 className="text-light mt-3">Global Coverage</h2>
                                    <p className="text-light" >Track matches from over 100 leagues worldwide</p>
                                </div>
                            </div>
                            <div className="col-lg-4" >
                                <div className="feature" >
                                    <Clock size={65} className="feature-icon p-2" style={{ borderRadius: '15px' }} ></Clock>
                                    <h2 className="text-light mt-3">Global Coverage</h2>
                                    <p className="text-light" >Track matches from over 100 leagues worldwide</p>
                                </div>
                            </div>
                        </div>

                        <div className="row" >
                            <div className="col-lg-4" >
                                <div className="feature" >
                                    <TrendingUp size={65} className="feature-icon p-2" style={{ borderRadius: '15px' }} ></TrendingUp>
                                    <h2 className="text-light mt-3">Global Coverage</h2>
                                    <p className="text-light" >Track matches from over 100 leagues worldwide</p>
                                </div>
                            </div>
                            <div className="col-lg-4" >
                                <div className="feature" >
                                    <Award size={65} className="feature-icon p-2" style={{ borderRadius: '15px' }} ></Award>
                                    <h2 className="text-light mt-3">Global Coverage</h2>
                                    <p className="text-light" >Track matches from over 100 leagues worldwide</p>
                                </div>
                            </div>
                            <div className="col-lg-4" >
                                <div className="feature" >
                                    <Heart size={65} className="feature-icon p-2" style={{ borderRadius: '15px' }} ></Heart>
                                    <h2 className="text-light mt-3">Global Coverage</h2>
                                    <p className="text-light" >Track matches from over 100 leagues worldwide</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>

                <section>

                    <div className="container my-5"  >
                        <div className="p-5" style={{ backgroundColor: 'var(--light-blue)', borderRadius: '15px' }} >
                            <h2>Ready to Experience Modern Football Tracking?</h2>
                            <p>Join thousands of football enthusiasts who rely on our scoreboard for real-time updates and insights.</p>
                            <button className="btn btn-outline-primary" variant="outline-light" href="#features">Get Started</button>
                        </div>

                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
