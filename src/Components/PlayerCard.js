import React from 'react'

export const PlayerCard = ({ player, color }) => (
    <div className="player">
        <img src={player.photo} alt={player.name} className="player-photo" />
        <div className="player-number">{player.number}</div>
        <div className="player-name">{player.name}</div>
    </div>
);
