import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onSearch }) => {
  return (
    <div className="min-h-screen">
      <Navbar onSearch={onSearch} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
