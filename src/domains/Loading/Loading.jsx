import React from 'react';
import { ClockLoader } from 'react-spinners';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <ClockLoader color="#36d7b7" size={100} />
    </div>
  );
};

export default Loading;
