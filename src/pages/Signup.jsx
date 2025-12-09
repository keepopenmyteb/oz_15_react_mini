import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import InputField from "../components/Input";
import { useSupabaseAuth } from "../supabase"; 
import "./Signup.scss";

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth(); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.length < 2) {
      newErrors.name = "이름은 최소 2글자 이상 입력하세요.";
    }
    // ... (이메일, 비밀번호 유효성 검사 생략)
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (form.password.length < 6) {
      newErrors.password = "비밀번호는 최소 6자리 이상이어야 합니다.";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // ✅ 객체 인수를 전달하도록 수정
      const userInfo = await signUp({
        email: form.email,
        password: form.password,
        name: form.name 
      });

      alert("회원가입 성공! 이메일을 확인하세요.");
      navigate("/login"); 
    } catch (err) {
      alert("회원가입 실패: " + err.message);
    }
  };

  return (
    <div className="auth-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="이름"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <InputField
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* ... (비밀번호, 비밀번호 확인 필드 생략) */}
        <InputField
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <InputField
          label="비밀번호 확인"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

        <button type="submit" className="auth-btn">회원가입</button>
      </form>

      <div className="link-box">
        Netflix 회원이신가요? <Link to="/login">지금 로그인하세요</Link>
      </div>
    </div>
  );
}

export default Signup;