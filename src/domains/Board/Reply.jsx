import React, { useState } from 'react';
import styles from './Reply.module.css';

const Reply = () => {
  const [comment, setComment] = useState('');
  // Mock data for display
  const [replies, setReplies] = useState([
    { id: 1, content: '첫 번째 댓글입니다.' },
    { id: 2, content: '두 번째 댓글입니다. UI가 깔끔하네요!' },
  ]);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    const newReply = {
      id: Date.now(),
      content: comment,
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
            <div className={styles.content}>{reply.content}</div>
            <div className={styles.buttonGroup}>
              <button className={styles.editBtn}>수정</button>
              <button className={styles.deleteBtn}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
