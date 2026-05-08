import React from 'react';
import styles from './App.module.css';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt');
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Welcome Back</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="name@company.com" 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
        <div className={styles.footer}>
          Don't have an account? <a href="#register">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default App;
