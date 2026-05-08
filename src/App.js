import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Members
import Login from './domains/Members/Login';
import Signup from './domains/Members/Signup';
import Mypage from './domains/Members/Mypage';

// Board
import Board from './domains/Board/Board';
import BoardWrite from './domains/Board/BoardWrite';
import BoardDetail from './domains/Board/BoardDetail';

// Loading
import Loading from './domains/Loading/Loading';

function App() {
  return (
      <Routes>
        {/* Members Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />

        {/* Board Routes */}
        <Route path="/board" element={<Board />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/:seq" element={<BoardDetail />} />
        
        {/* Loading / Error Fallback */}
        <Route path="/loading" element={<Loading />} />
        
      </Routes>
  );
}

export default App;
