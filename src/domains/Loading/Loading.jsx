import React from 'react';
import { FadeLoader } from 'react-spinners';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <FadeLoader color="#75e3f1" size={80} />
      <p className={styles.text}>데이터 로딩 중입니다..</p>
    </div>
  );
};

export default Loading;
