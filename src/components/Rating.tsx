import React from 'react';

const Star = ({ filled }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? "#ddbe1a" : "#d1d1d1"}
    className="feather feather-star"
    style={{ marginRight: '0px' }}
  >
    <polygon points="12 2 15 8.5 22 9.2 17 14 18.4 21 12 17.8 5.6 21 7 14 2 9.2 9 8.5 12 2"></polygon>
  </svg>
);

const Rating = ({ rating }: any) => {
  const renderStar = (index: any) => {
    if(rating > 5) {
      if(rating == 9.9) {
        rating = 5
      }else {
        rating = Math.floor((rating / 2) * 10) / 10 - 0.2
      }
    }
    if (rating >= index + 1) {
      return <Star key={index} filled />;
    } else if (rating > index && rating < index + 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="feather feather-star"
          style={{ marginRight: '0px' }}
          key={index}
        >
          <defs>
            <linearGradient id={`grad${index}`}>
              <stop offset={`${(rating - index) * 100}%`} stopColor="#F18618" />
              <stop offset={`${(rating - index) * 100}%`} stopColor="#ddd" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15 8.5 22 9.2 17 14 18.4 21 12 17.8 5.6 21 7 14 2 9.2 9 8.5 12 2"
            fill={`url(#grad${index})`}
          />
        </svg>
      );
    } else {
      return <Star key={index} filled={false} />;
    }
  };

  return (
    <div>
      <div className="stars" style={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(5)].map((_, index) => renderStar(index))}
      </div>
    </div>
  );
};

export default Rating;
