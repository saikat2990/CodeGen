import React from 'react';
import Sidebar from '../components/general/Sidebar';
import Header from '../components/general/Header';
import MainContent from '../components/general/MainContent';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:pl-64">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
