import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen antialiased">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
