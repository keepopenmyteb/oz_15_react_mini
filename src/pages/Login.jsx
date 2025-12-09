import React, { useState } from "react";
import InputField from "../components/Input";
import { useNavigate, Link } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import "./Login.scss"; 

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth(); 

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    try {
      // ⭐️ 핵심 수정: login 함수에 단일 객체를 인수로 전달합니다.
      const userInfo = await login({
        email: form.email,
        password: form.password
      });

      // useEmailAuth 훅이 에러 없이 userInfo 객체를 반환하면 성공
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      // login 함수에서 던져진 에러 처리
      alert("로그인 실패: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일 입력"
        />
        <InputField
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호 입력"
        />
        <button type="submit" className="login-btn">로그인</button>
      </form>
      <div className="link-box">
        Netflix 회원이 아닌가요? <Link to="/signup">지금 가입하세요</Link>
      </div>
    </div>
  );
}

export default Login;