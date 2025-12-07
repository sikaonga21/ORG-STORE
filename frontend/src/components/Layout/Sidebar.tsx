import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, FolderKanban } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/organizations', icon: Building2, label: 'Organizations' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
  ];

  return (
    <aside className="w-64 glass border-r border-slate-200/60 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
