import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BoardDetail.module.css';
import { deletePost, getPostDetail, updatePost } from '../../api/boardApi';
import Reply from './Reply';
import useAuthStore from '../../store/authStore';

const BoardDetail = () => {
  const { seq } = useParams();
  const navigate = useNavigate();
  const loginId = useAuthStore(state => state.loginId);

  const [post, setPost] = useState({
    title: "",
    writer: "",
    contents: "",
    write_date: ""
  });

  const [editState, setEditState] = useState("");
  const [editMsg, setEditMsg] = useState({title:"", contents:""});

  useEffect(()=>{
    getPostDetail(seq).then(resp => {
      setPost(resp.data);
    })
  },[])

  const handleEditChange = (e) => {
    const {name, value} = e.target;
    setEditMsg(prev => ({...prev, [name]:value}));
  }

  const handleEditBtn = () => {
    if (!editMsg.title.trim() || !editMsg.contents.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }
    updatePost(seq, editMsg).then(resp => {
      setPost(prev => ({...prev, title: editMsg.title, contents: editMsg.contents}));
      setEditState("");
    });
  }

  const handleDelete= () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost(seq).then(resp => {
        alert("삭제되었습니다.");
        navigate("/board");
      })
    }
  }

  return (
    <div className={styles.container}>
      {
        editState === "edit" ?
        <>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <input type='text' 
                maxLength={100}
                name='title'
                onChange={handleEditChange}
                value={editMsg.title}
                className={styles.editInput}
              />
            </h1>
            <div className={styles.meta}>
              <span className={styles.author}>{post.writer}</span>
              <div className={styles.divider}></div>
              <span className={styles.date}>{post.write_date.split(" ")[0]}</span>
            </div>
          </div>

          <div className={styles.content}>
            <textarea 
              maxLength={1000}
              name='contents'
              onChange={handleEditChange}
              value={editMsg.contents}
              className={styles.editTextarea}
            />
          </div>

          <div className={styles.footer}>
            <button 
              className={styles.editBtn}
              onClick={handleEditBtn}
            >
              수정완료
            </button>
            <button 
              className={styles.deleteBtn}
              onClick={() => {setEditState("")}}
            >
              수정취소
            </button>
          </div>
        </>
        :
        <>
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
          {
            post.writer == loginId ?
            <>
              <div className={styles.footer}>
                <button 
                  className={styles.backBtn} 
                  onClick={() => navigate('/board')}
                >
                  목록으로
                </button>
                <button 
                  className={styles.editBtn}
                  onClick={() => {setEditState("edit"); setEditMsg({title: post.title, contents: post.contents})}}
                >
                  수정하기
                </button>
                <button 
                  className={styles.deleteBtn}
                  onClick={handleDelete}
                >
                  삭제하기
                </button>
              </div>
            </>
            :
            <div className={styles.footer}>
              <button 
                className={styles.backBtn} 
                onClick={() => navigate('/board')}
              >
                목록으로
              </button>
            </div>
          }
        </>
      }
      
      <Reply seq={seq}/>
    </div>
  );
};

export default BoardDetail;
