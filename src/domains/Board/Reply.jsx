import React, { useState } from 'react';
import styles from './Reply.module.css';

const Reply = () => {
  const [comment, setComment] = useState('');
  // Mock data for display
  const [reply, setReply] = useState([
    { id: 1, content: '첫 번째 댓글입니다.' },
    { id: 2, content: '두 번째 댓글입니다. UI가 깔끔하네요!' },
  ]);

  const [editTarget, setEditTarget] = useState(false);
  const [update, setUpdate] = useState(null);

  const handleSubmit = () => {
    if (comment === "" || comment === null) {
      alert("댓글을 먼저 작성해 주세요.")
      return;
    }
    const newReply = {
      id: Date.now(),
      content: comment,
    };
    setReply([...reply, newReply]);
    setComment("");
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
        {reply.map((reply) => (
          <div key={reply.id} className={styles.replyItem}>

            {
              editTarget === true ? 
                <>
                  <input className={styles.content} placeholder="수정 내용을 입력해 주세요." />
                  <div className={styles.buttonGroup}>
                    <button className={styles.editBtn}>저장</button>
                    <button onClick={() => { setEditTarget(false) }} className={styles.deleteBtn}>취소</button>
                  </div>
                </>
              :
                <>
                  <div className={styles.content}>{reply.content}</div>
                  <div className={styles.buttonGroup}>
                    <button onClick={() => { setEditTarget(true); }} className={styles.editBtn} >수정</button>
                    <button className={styles.deleteBtn}>삭제</button>
                  </div>
                </>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
