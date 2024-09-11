import React from 'react';
import { Link } from 'react-router-dom';

function ProfileActionCard({ iconClass, title, description, route }) {
    return (
      <Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card text-center shadow-sm" style={{ width: '12rem', height: '15rem', margin: '10px', cursor: 'pointer' }}>
          <div className="card-body d-flex flex-column justify-content-center">
            <i className={`bi ${iconClass}`} style={{ fontSize: '2rem' }}></i>
            <h5 className="card-title mt-2">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </Link>
    );
  }

export default ProfileActionCard;
