

import React from 'react';
import landingImage from "../../assets/QA.jpg";
import './LandingPage.css'; 
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate=useNavigate();
    const handleNavigation=()=>{
        navigate("/question-answers")
    }
  return (
    <div className="landing-container">
      <img src={landingImage} className="landing-image" alt="Landing" />
      <div className="overlay">
        <button className='btn btn-primary explore-button' onClick={handleNavigation}>
          Click to Explore <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
