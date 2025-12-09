import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from "../supabase"; 
import './NavBarStyle.scss';

function NavBar({ isLoggedIn, setIsLoggedIn, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useSupabase(); 

  const handleLogout = async () => {
    try {
      await logout(); 
      setIsLoggedIn(false);
      setMenuOpen(false);
      alert("로그아웃 되었습니다");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/"><h1>NETFLIX</h1></Link>
      </div>

      <div className="menu">
        <Link to="/" className="menu-item">홈</Link>
        <Link to="/movies" className="menu-item">영화</Link>
        <Link to="/series" className="menu-item">시리즈</Link>
        <Link to="/mylist" className="menu-item">내가 찜한 콘텐츠</Link>
      </div>

      <div className="auth-buttons">
        {!isLoggedIn && (
          <>
            <Link to="/login" className="auth-button login">로그인</Link>
            <Link to="/signup" className="auth-button signup">회원가입</Link>
          </>
        )}

        {isLoggedIn && (
          <div className="profile-area">
            <img
              src="/images/profile.jpg"
              alt="profile"
              className="profile-img"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="dropdown">
                <Link to="/mypage">마이 페이지</Link>
                <span onClick={handleLogout}>로그아웃</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;