import React from 'react';

function Container({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen bg-white iphone-15-pro-max-container">
      {children}
    </div>
  );
}

export default Container;
