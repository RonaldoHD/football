import React from "react";

const CompetitionSkeleton = () => {
  return (
    <div className="competitions-container">
      {/* <h2>OTHER COMPETITIONS</h2> */}
      <div className="competition-table">
        {[...Array(20)].map((_, index) => (
          <div className="competition-row" key={index}>
            <div className="competition-info">
              <div className="flag skeleton-box" />
              <div className="text-group">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
              </div>
            </div>
            <div className="skeleton-line small" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionSkeleton;
