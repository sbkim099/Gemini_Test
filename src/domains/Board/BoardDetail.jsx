import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BoardDetail.module.css';
import { getPostDetail } from '../../api/boardApi';

const BoardDetail = () => {
  const { seq } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    writer: "",
    contents: "",
    write_date: ""
  });

  useEffect(()=>{
    getPostDetail(seq).then(resp => {
      setPost(resp.data);
    })
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.meta}>
          <span className={styles.author}>{post.writer}</span>
          <div className={styles.divider}></div>
          <span className={styles.date}>{post.write_date.split(" ")[0]}</span>
        </div>
      </div>

      <div className={styles.content}>
        {post.contents}
      </div>

      <div className={styles.footer}>
        <button 
          className={styles.backBtn} 
          onClick={() => navigate('/board')}
        >
          목록으로
        </button>
        <button 
          className={styles.editBtn}
          onClick={() => {}}
        >
          수정하기
        </button>
        <button 
          className={styles.deleteBtn}
          onClick={() => {
            if(window.confirm('정말 삭제하시겠습니까?')) {
              
            }
          }}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
