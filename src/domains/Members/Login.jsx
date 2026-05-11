import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { isLogin, deleteMember } from '../../api/membersApi';

const Login = () => {
  const [user, setUser] = useState({ id: '', pw: '' });
  const navigate = useNavigate();
  
  const token = useAuthStore(state => state.token);
  const loginId = useAuthStore(state => state.loginId);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin(user).then(resp => {
      login(resp.data);
    }).catch(err => {
      alert("로그인 실패: " + (err.response?.data || "아이디 또는 비밀번호를 확인하세요."));
    });
  };

  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다.");
  };

  const handleDelete = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      deleteMember(loginId).then(resp => {
        alert("회원 탈퇴가 완료되었습니다.");
        logout();
      }).catch(err => {
        alert("탈퇴 실패: " + (err.response?.data || "문제가 발생했습니다."));
      });
    }
  };

  if (token) {
    return (
      <div className={styles.container}>
        <div className={styles.welcomeBox}>
          <h1 className={styles.title}>환영합니다!</h1>
          <p><strong>{loginId}</strong>님, 반갑습니다.</p>
          <div className={styles.buttonGroup}>
            <button onClick={() => navigate('/mypage')} className={styles.mypageButton}>마이페이지</button>
            <button onClick={() => navigate('/board')}  className={styles.toBoardButton}>게시판</button>
            <button onClick={handleLogout} className={styles.logoutButton}>로그아웃</button>
            <button onClick={handleDelete} className={styles.deleteButton}>회원탈퇴</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id">User ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={user.id}
              onChange={handleChange}
              placeholder="Enter your ID"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="pw">Password</label>
            <input
              type="password"
              id="pw"
              name="pw"
              value={user.pw}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
        <div className={styles.footer}>
          <span>Don't have an account? </span>
          <button onClick={() => navigate('/signup')} className={styles.linkButton}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
