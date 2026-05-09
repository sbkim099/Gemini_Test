import React, { useState } from 'react';
import styles from './Reply.module.css';

const Reply = () => {
  const [comment, setComment] = useState('');
  // Mock data for display including author and date
  const [replies, setReplies] = useState([
    { 
      id: 1, 
      author: '홍길동', 
      content: '첫 번째 댓글입니다.', 
      date: '2024-05-08 14:30' 
    },
    { 
      id: 2, 
      author: '김철수', 
      content: '두 번째 댓글입니다. UI가 깔끔하네요!', 
      date: '2024-05-08 15:45' 
    },
  ]);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newReply = {
      id: Date.now(),
      author: '현재 사용자', // 실제 구현시에는 로그인 유저 정보 사용
      content: comment,
      date: formattedDate
    };
    setReplies([...replies, newReply]);
    setComment('');
  };

  return (
    <div className={styles.replyContainer}>
      <div className={styles.inputSection}>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해주세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={styles.submitBtn} onClick={handleSubmit}>
          등록
        </button>
      </div>

      <div className={styles.replyList}>
        {replies.map((reply) => (
          <div key={reply.id} className={styles.replyItem}>
            <div className={styles.mainContent}>
              <div className={styles.author}>{reply.author}</div>
              <div className={styles.content}>{reply.content}</div>
            </div>
            <div className={styles.sideContent}>
              <div className={styles.date}>{reply.date}</div>
              <div className={styles.buttonGroup}>
                <button className={styles.editBtn}>수정</button>
                <button className={styles.deleteBtn}>삭제</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
