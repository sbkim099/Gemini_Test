import React, { useEffect, useState } from 'react';
import styles from './Reply.module.css';
import { deleteReply, getReplyByParentSeq, postReply, putReply } from '../../api/replyApi';
import useAuthStore from '../../store/authStore';

const Reply = ({ seq }) => {
  const [reply, setReply] = useState([{
    seq: "",
    writer: "",
    contents: "",
    write_date: ""
  }]);
  const [comment, setComment] = useState("");
  const [editTarget, setEditTarget] = useState(null);
  const [editContents, setEditContents] = useState("");
  const loginId = useAuthStore(state => state.loginId);

  useEffect(() => {
    getReplyByParentSeq(seq).then(resp => {
      setReply(resp.data);
    })
  }, [seq]);


  const handleAddReply = () => {
    if (comment === "" || comment === null) {
      alert("댓글을 먼저 작성해 주세요.");
      return;
    }

    const newReply = {
      parent_seq: seq,
      writer: loginId,
      contents: comment
    }

    postReply(newReply).then(() => {
      getReplyByParentSeq(seq).then(resp => {
        setReply(resp.data);
      })
      setComment("");
    })
  };

  const handleEdit = () => {
    putReply(editTarget, editContents).then(() => {
      getReplyByParentSeq(seq).then(resp => {
        setReply(resp.data);
      })
      alert("수정이 완료되었습니다.")
      setEditTarget(null);
    })
  }

  const handleDelete = (delSeq) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteReply(delSeq).then(() => {
        getReplyByParentSeq(seq).then(resp => {
          setReply(resp.data);
        })
      })
    } return;
  }

  return (
    <div className={styles.replyContainer}>
      <div className={styles.inputSection}>
        <textarea
          className={styles.textarea}
          placeholder="댓글을 입력해주세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <button className={styles.submitBtn} onClick={handleAddReply}>
          등록
        </button>
      </div>

      <div className={styles.replyList}>
        {reply.map((reply) => (
          <div key={reply.seq} className={styles.replyItem}>
            <div className={styles.mainContent}>
              <div className={styles.author}>{reply.writer}</div>
              {
                editTarget === reply.seq ?
                  <>
                    <textarea
                      className={styles.textarea}
                      placeholder="댓글을 입력해주세요..."
                      value={editContents}
                      onChange={(e) => setEditContents(e.target.value)} />

                  </>
                  :

                  <div className={styles.content}>{reply.contents}</div>
              }
            </div>
            <div className={styles.sideContent}>
              <div className={styles.date}>{reply.write_date.substring(0, 10)}</div>

              {
                loginId === reply.writer && (
                  editTarget === reply.seq ?

                    <div className={styles.buttonGroup}>
                      <button className={styles.editBtn} onClick={handleEdit}>저장</button>
                      <button className={styles.deleteBtn} onClick={() => { setEditTarget(null) }}>취소</button>
                    </div>
                    :

                    <div className={styles.buttonGroup}>
                      <button className={styles.editBtn} onClick={() => {
                        setEditTarget(reply.seq); setEditContents(reply.contents);
                      }}>수정</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(reply.seq)}>삭제</button>
                    </div>
                )
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reply;
