import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 antialiased">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
