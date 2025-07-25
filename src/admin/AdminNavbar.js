import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function AdminNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => setMobileMenuOpen((open) => !open);
  const handleCloseMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <style>{`
        .admin-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          padding: 0.5rem 2rem;
          border-bottom: 1px solid #eee;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-logo {
          font-weight: bold;
          color: #e91e63;
          font-size: 1.2rem;
          letter-spacing: 0.5px;
          margin-top: 0.7rem;
        }
        .navbar-links {
          display: flex;
          gap: 1.5rem;
          transition: max-height 0.3s, opacity 0.3s;
        }
        .navbar-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          transition: background 0.2s, color 0.2s;
        }
        .navbar-links a.active,
        .navbar-links a:hover {
          background: #e91e63;
          color: #fff;
        }
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          margin-left: 0.5rem;
        }
        @media (max-width: 700px) {
          .admin-navbar {
            flex-direction: column;
            align-items: flex-start;
            padding: 0.5rem 1rem;
            
          }
          .navbar-hamburger {
            display: block;
            position: absolute;
            right: 1.2rem;
            z-index: 120;
          }
          .navbar-links {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            margin: 0.5rem 0;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            background: #fff;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
            transition: max-height 0.3s, opacity 0.3s;
          }
          .navbar-links.open {
            max-height: 400px;
            opacity: 1;
            pointer-events: auto;
            padding-bottom: 0.5rem;
          }
          .navbar-actions {
            display: none;
          }
          .navbar-logout-mobile {
            display: block;
            margin: 0.5rem 0 0.5rem -1rem;
          }
        }
        @media (min-width: 701px) {
          .navbar-logout-mobile {
            display: none !important;
          }
        }
      `}</style>
      <nav className="admin-navbar">
        <div className="navbar-logo">Jana Portfolio Admin</div>
        <button className="navbar-hamburger" aria-label="Toggle menu" onClick={handleToggleMenu}>
          {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>
        <div className={`navbar-links${mobileMenuOpen ? ' open' : ''}`} onClick={handleCloseMenu}>
          <NavLink to="/admin/home-content" className={({ isActive }) => isActive ? 'active' : ''}>Home Content</NavLink>
          <NavLink to="/admin/about-content" className={({ isActive }) => isActive ? 'active' : ''}>About Content</NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => isActive ? 'active' : ''}>Services</NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/admin/results" className={({ isActive }) => isActive ? 'active' : ''}>Results</NavLink>
          <NavLink to="/admin/tools" className={({ isActive }) => isActive ? 'active' : ''}>Tools</NavLink>
          {/* Logout for mobile */}
          <div className="navbar-logout-mobile"><Logout /></div>
        </div>
        {/* Logout for desktop */}
        <div className="navbar-actions">
          <Logout />
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar; 