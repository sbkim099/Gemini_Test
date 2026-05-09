import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Board.module.css';
import { getPostsList } from '../../api/boardApi';
import { Pagination } from '@mui/material';
import useLoadingStore from '../../store/loadingStore';

const Board = () => {
  const navigate = useNavigate();
  // 로딩바
  const startEndLoading = useLoadingStore(state => state.startEndLoading);
  // 페이지 네비게이터 관련

  // url 뒤에 page 정보 붙일 때
  const [searchParam, setSearchParam] = useSearchParams();
  const currentPage = parseInt(searchParam.get("cPage")) || 1;
  const [totalPages, setTotalPages] = useState();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    startEndLoading()
    getPostsList(currentPage).then(resp => {
      setPosts(resp.data.list);
      setTotalPages(Math.ceil(resp.data.count / 10));
    })
  },[currentPage])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>게시판</h1>
        <button 
          className={styles.writeBtn}
          onClick={() => navigate('/board/write')}
        >
          글쓰기
        </button>
      </header>

      <table className={styles.boardList}>
        <thead>
          <tr>
            <th className={styles.no}>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr 
                key={index} 
                className={styles.row}
              >
                <td className={styles.no}>{post.seq}</td>
                <td className={styles.postTitle}><Link to={`/board/${post.seq}`}>{post.title}</Link></td>
                <td className={styles.author}>{post.writer}</td>
                <td className={styles.date}>{post.write_date.split(" ")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className={styles.empty}>게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MUI Pagination Placeholder */}
      <div className={styles.paginationWrapper}>
        {/* TODO: Install @mui/material and add <Pagination /> component here */}
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e,page) => {setSearchParam({cPage: page})}}
            siblingCount={4}
            boundaryCount={0}
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
