import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardWrite.module.css';
import { addPost } from '../../api/boardApi';
import useAuthStore from '../../store/authStore';

const BoardWrite = () => {
  const navigate = useNavigate();
  
  const [contents, setContents] = useState({title: "", contents:""});
  
  const loginId = useAuthStore(state => state.loginId);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContents((prev) => ({
      ...prev,
      writer: loginId,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!contents.title.trim() || !contents.contents.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }
    addPost(contents).then(resp => {
      navigate('/board');
    })
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>게시글 작성</h1>
      
      <div className={styles.formContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="author">작성자</label>
          <input 
            type="text" 
            id="author" 
            value={loginId} 
            readOnly 
            className={styles.readOnlyInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="title">제목</label>
          <input 
            type="text" 
            id="title" 
            placeholder="제목을 입력하세요"
            name="title"
            maxLength={100}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="content">내용</label>
          <textarea 
            id="content" 
            placeholder="내용을 입력하세요" 
            className={styles.textarea}
            name="contents"
            maxLength={1000}
            onChange={handleChange}
          />
        </div>

        <div className={styles.footer}>
          <button 
            type="button" 
            className={styles.cancelBtn}
            onClick={() => navigate('/board')}
          >
            취소
          </button>
          <button 
            type="button" 
            className={styles.submitBtn}
            onClick={handleSave}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardWrite;
