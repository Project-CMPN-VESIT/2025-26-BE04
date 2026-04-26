import React from 'react';
import './DonationContainer.css';

const DonationContainer = ({ 
  image, 
  title, 
  content,
  amountRaised = 120000,
  goalAmount = 240000,
  memberCount = 900
}) => {
  const goalPercentage = Math.round((amountRaised / goalAmount) * 100);
  
  return (
    <div className="donation-container">
      <div className="donation-image">
        <img src={image} alt={title} />
      </div>
      
      <div className="donation-content">
        <h2 className="donation-title">{title}</h2>
        <p className="donation-description">{content}</p>
        
        <div className="progress-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${goalPercentage}%` }}
            >
              <span className="progress-amount">₹{amountRaised.toLocaleString()} raised</span>
            </div>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="goal-stats">
            <span className="goal-percentage">{goalPercentage}%</span>
            <span className="goal-label">goal reached</span>
            <span className="goal-target">Target - ₹{goalAmount.toLocaleString()}</span>
          </div>
          
          <div className="member-stats">
            <div className="member-avatars">
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
              <div className="avatar"></div>
            </div>
            <span className="member-count">Join {memberCount}+ Members</span>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="donate-button">Donate Now</button>
          <button className="share-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationContainer;