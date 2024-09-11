import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonNewTrip({ iconClass, cardText, buttonText, redirectTo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div className="card text-center shadow-sm" style={{ width: '18rem', padding: '20px' }}>
      <i className={`bi ${iconClass}`} style={{ fontSize: '3rem' }}></i>
      <h5 className="card-title mt-3">{cardText}</h5>
      <button className="btn btn-primary mt-3" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default ButtonNewTrip;

