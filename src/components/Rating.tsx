import React from 'react';

const Star = ({ filled }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={filled ? "#ffb506" : "#f1f1f1"}
    className="feather feather-star"
    style={{ marginRight: '0px' }}
  >
    <polygon
      stroke="#ffb506"
      strokeWidth="1"
      points="12 2 15 8.5 22 9.2 17 14 18.4 21 12 17.8 5.6 21 7 14 2 9.2 9 8.5 12 2"
    ></polygon>
  </svg>
);

const Rating = ({ rating }: any) => {
  rating = rating.toFixed(1)
  if (rating >= 9.7) {
    rating = 5;
  } else if (rating >= 9 && rating < 9.7) {
    rating = rating - 5 + 0.01;
  } else if (rating > 8.2 && rating < 9) {
    rating = 4;
  } else {
    rating = 3.5;
  }
  const renderStar = (index: any) => {
    if (rating >= index + 1) {
      return <Star key={index} filled />;
    } else if (rating > index && rating < index + 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="feather feather-star"
          style={{ marginRight: '0px' }}
          key={index}
        >
          <defs>
            <linearGradient id={`grad${index}`}>
              <stop offset={`${(rating - index) * 100}%`} stopColor="#ddbe1a" />
              <stop offset={`${(rating - index) * 100}%`} stopColor="#ddd" />
            </linearGradient>
          </defs>
          <polygon
            stroke="#ffb506"
            strokeWidth="1"
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
