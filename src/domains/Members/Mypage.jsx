import React, { useEffect, useState } from 'react';
import styles from './Mypage.module.css';
import { useNavigate } from 'react-router-dom';
import { getMember, getProfile, updateMember, upProfile } from '../../api/membersApi';
import useAuthStore from '../../store/authStore';

const Mypage = () => {
  const { loginId } = useAuthStore();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    zipcode: '',
    address1: '',
    address2: ''
  });
  const navigate = useNavigate();

  const [isUpdate, setIsUpdate]= useState(false);
  //update 내용 저장용
  const [upData,setUpdata] = useState({});
  //출력
  useEffect(() => {
    getProfile(loginId).then(resp=>{
      setFormData(resp.data);
    })
  }, []);

  //네임값의 정보들 긁어 업뎃용 데이터에 담아줌
  const handleChange = (e) => {
    const {name,value}=e.target;
    setUpdata(prev=>({...prev,[name]:value}));
  };

  const handlePostcode = () => {
    new window.kakao.Postcode({
      oncomplete: function(data) {
        setUpdata(prev => ({ ...prev, zipcode: data.zonecode, address1: data.roadAddress }));
      }
    }).open();
  };

  //수정버튼 누를때
  const handleUpdate = () => {
    setIsUpdate(true);
    //업데이트 데이터에 지금 현재 input data를 담아줘야함
    setUpdata(formData);

  }
  //취소 버튼 누를때
  const handleCancel = () =>{
    setIsUpdate(false);
  }
  // 완료 버튼 누를때
  const handleSuccess = (e) => {
    upProfile(loginId,upData).then(()=>{
      // setFormData(prev=>({...prev,upData}));
      getProfile(loginId).then(resp=>{
        setFormData(resp.data);
      })
    });
    setIsUpdate(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mypageBox}>
        <h1 className={styles.title}>Edit Profile</h1>
        
        {
          isUpdate===false?
          <div className={styles.fasleForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="id">ID</label>
            <div id="id" name="id" value={formData.id} className={styles.readOnlyInput} readOnly>{formData.id}</div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <div type="text" id="name" name="name" value={formData.name} className={styles.readOnlyInput} required >{formData.name}</div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <div id="email" name="email" value={formData.email} className={styles.readOnlyInput} required >{formData.email}</div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone Number</label>
            <div id="phone" name="phone" value={formData.phone} placeholder="010-0000-0000" className={styles.readOnlyInput} required >
              {formData.phone}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="zipcode">Zipcode</label>
              <div readOnly id="zipcode" name="zipcode" value={formData.zipcode} className={styles.readOnlyInput} required >{formData.zipcode}</div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address1">Address</label>
            <div readOnly id="address1" name="address1" value={formData.address1} className={styles.readOnlyInput} required >{formData.address1}</div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address2">Detail Address</label>
            <div id="address2" name="address2" value={formData.address2} className={styles.readOnlyInput} >{formData.address2}</div>
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={() => navigate(-1)} className={styles.backButton}>Back</button>
            <button type="submit" className={styles.updateButton} onClick={handleUpdate}>수정</button>
          </div>
        </div>
          :
        <div className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="id">ID</label>
            <input type="text" id="id" name="id" value={upData.id} className={styles.readOnlyInput} readOnly />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={upData.name} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={upData.email} onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={upData.phone} onChange={handleChange} placeholder="010-0000-0000" required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="zipcode">Zipcode</label>
            <div className={styles.flexRow}>
              <input type="number" readOnly id="zipcode" name="zipcode" value={upData.zipcode} className={styles.readOnlyInput} required 
              onChange={handleChange}/>
              <button type="button" className={styles.smallButton} onClick={handlePostcode}>검색</button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address1">Address</label>
            <input type="text" readOnly id="address1" name="address1" value={upData.address1} className={styles.readOnlyInput} 
            onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address2">Detail Address</label>
            <input type="text" id="address2" name="address2" value={upData.address2} onChange={handleChange} />
          </div>
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handleCancel}className={styles.backButton}>취소</button>
            <button type="submit" className={styles.successButton} onClick={handleSuccess} >완료</button>
          </div>
        </div>
        }
      </div>
    </div>
  );
};

export default Mypage;
