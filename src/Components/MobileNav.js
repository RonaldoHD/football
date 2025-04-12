import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Radio , Trophy, Calendar, Heart, User } from "lucide-react";

const MobileNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-md-none fixed-bottom bg-dark  border-top border-secondary">
      <div className="d-flex justify-content-around align-items-center py-2">
        <Link
          to="/dashboard/matches"
          className={`d-flex flex-column align-items-center text-decoration-none small ${
            isActive("/dashboard/matches") ? "text-primary" : "text-secondary"
          }`}
        >
             <Trophy size={20} className="mb-1" />
          <span>Matches</span>
        </Link>

        <Link
          to="/dashboard/live"
          className={`d-flex flex-column align-items-center text-decoration-none small ${
            isActive("/dashboard/live") ? "text-primary" : "text-secondary"
          }`}
        >
          <Radio  size={20} className="mb-1" />
          <span>Live</span>
        </Link>

        <Link
          to="#"
          className="d-flex flex-column align-items-center text-secondary text-decoration-none small"
        >
          <Calendar size={20} className="mb-1" />
          <span>News</span>
        </Link>

        <Link
          to="#"
          className="d-flex flex-column align-items-center text-secondary text-decoration-none small"
        >
          <Heart size={20} className="mb-1" />
          <span>Favorites</span>
        </Link>

        {/* <Link
          to="#"
          className="d-flex flex-column align-items-center text-secondary text-decoration-none small"
        >
          <User size={20} className="mb-1" />
          <span>Profile</span>
        </Link> */}
      </div>
    </div>
  );
};

export default MobileNav;
