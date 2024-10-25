import React from 'react';
import landingImage from "../../assets/QAnew.jpg";
import './LandingPage.css'; 
import { useNavigate } from 'react-router-dom';
import { logoList } from "../../common/Logos";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/question-answers");
  };

  return (
    <div className="landing-container">
      <img src={landingImage} className="landing-image" alt="Landing" />
    
      <div className="overlay">
        <button className='btn btn-primary explore-button' onClick={handleNavigation}>
          Click to Explore <span className="arrow">→</span>
        </button>
      </div>
      
      <div className="logo-container">
        {logoList.map((logo, index) => (
          <img 
            key={index} 
            src={logo} 
            className={`logo logo-${index}`} 
            alt={`logo-${index}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
