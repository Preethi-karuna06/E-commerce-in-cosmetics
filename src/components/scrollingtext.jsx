import React from 'react';

const ScrollingText = () => {
  const containerStyle = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    backgroundColor: '#f5efe6',
  };

  const textStyle = {
    display: 'inline-block',
    paddingLeft: '100%',
    animation: 'scroll-left 10s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>

      <div style={containerStyle}>
        <div style={textStyle}>
        🌸 Free shipping on orders above $49! | 💄 New arrivals now live! | 🎁 Get 15% off with code BEAUTY15
        </div>
      </div>
    </>
  );
};

export default ScrollingText;
