import React, { useState } from 'react';
import styles from './Signup.module.css';
import { useNavigate } from 'react-router-dom';
import { insertForm, isIdExist } from '../../api/membersApi';

const Signup = () => {
  //기본 회원가입 데이터를 저장할 상태변수
  const [formData, setFormData] = useState({
    id: '',
    pw: '',
    pwCheck: '',
    name: '',
    phone: '',
    email: '',
    zipcode: '',
    address1: '',
    address2: ''
  });
  //비밀번호가 맞는지 안맞는지 체크해줄 변수
  const [pwError, setPwError] = useState('');
  //id 중복체크 상태 체크 변수
  const [isIdChecked, setIsIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    //name="id" 인 칸 건들면 중복체크 다시해야함
    if (name === 'id') {
      setIsIdChecked(false);
    }

    //pwcheck이나 pw에 뭘 입력했을때
    if (name === 'pwCheck' || name === 'pw') {
      //다른 곳 : 만약 pwCheck 입력중이면 formdata pw로 저장
      //         만약 pw입력중이면 지금 입력중인 값 저장
      const otherField = name === 'pwCheck' ? formData.pw : value;
      //지금 입력칸 : 만약 pwCheck 입력중이면 지금 값 입력
                  // 만약 pw 입력중이면 formdate.pwCheck임
      const currentField = name === 'pwCheck' ? value : formData.pwCheck;
      
      if (currentField && otherField !== currentField) {
        setPwError('Passwords do not match');
      } else {
        setPwError('');
      }
    }
  };

  //우편번호
    const handlePostcode=()=>{
    new window.kakao.Postcode({
        oncomplete: function(data) {
            setFormData(prev=>({...prev,zipcode:data.zonecode,address1:data.roadAddress}));
        }
    }).open();
    }
//id 중복체크
  const handleIdCheck = () => {
    if (!formData.id) {
      alert('ID를 입력해주세요.');
      return;
    }
    
    isIdExist(formData.id).then(resp => {
        if (resp.data == 1) {
          alert("이미 존재하는 ID입니다.");
          setIsIdChecked(false);
        } else {
          alert("사용 가능한 아이디입니다.");
          setIsIdChecked(true); // <--- 중복이 아닐 때만 true로 변경!
        }
      })
      .catch(err => {
        alert("중복 체크 중 오류가 발생했습니다.");
        setIsIdChecked(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isIdChecked) {
      alert('아이디 중복 체크를 해주세요.');
      return;
    }
    if (formData.pw !== formData.pwCheck) {
      setPwError('비밀번호를 다시 확인해주세요.');
      return;
    }
    
    insertForm(formData).then(resp => {
        alert("회원가입이 완료되었습니다.");
        navigate("/"); // 가입 성공 시 로그인(메인) 페이지로 이동
    }).catch(err => {
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id">ID</label>
            <div className={styles.flexRow}>
              <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required />
              <button type="button" className={styles.smallButton} onClick={handleIdCheck}>중복확인</button>
            </div>
            {isIdChecked && <p className={styles.successText}>사용 가능한 아이디입니다.</p>}
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="pw">Password</label>
              <input type="password" id="pw" name="pw" value={formData.pw} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="pwCheck">Confirm Password</label>
              <input type="password" id="pwCheck" name="pwCheck" value={formData.pwCheck} onChange={handleChange} required />
            </div>
          </div>
          {pwError && <p className={styles.errorText}>{pwError}</p>}

          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="010-0000-0000" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="zipcode">Zipcode</label>
            <div className={styles.flexRow}>
              <input type="number" readOnly id="zipcode" className={styles.readOnlyInput}
              name="zipcode" value={formData.zipcode} onChange={handleChange} required />
              <button type="button" className={styles.smallButton} onClick={handlePostcode}>검색</button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address1">Address</label>
            <input type="text" readOnly id="address1" name="address1" className={styles.readOnlyInput}
            value={formData.address1} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address2">Detail Address</label>
            <input type="text" id="address2" name="address2" value={formData.address2} onChange={handleChange} />
          </div>

          <button type="submit" className={styles.signupButton}>회원가입</button>
        </form>
        <div className={styles.footer}>
          <span>Already have an account? </span>
          <button onClick={() => navigate('/')} className={styles.linkButton}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
