import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function Layout({ isLoggedIn, setIsLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <NavBar 
        onSearch={setSearchQuery} 
        isLoggedIn={isLoggedIn}        
        setIsLoggedIn={setIsLoggedIn}  
      />

      <div className="content">
        <Outlet context={{ searchQuery }} />
      </div>
    </div>
  );
}

export default Layout;
