import React from 'react';

function Container({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen bg-white">
      {children}
    </div>
  );
}

export default Container;
