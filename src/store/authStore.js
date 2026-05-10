import {create} from 'zustand';

//return값이 jsx인 함수는 use를 붙이지 않음
// jsx를 return하지 않고 내부적으로 useState, useEffect 같은 내장 hook 함수 코드를 사용한다면 use를 붙여줌
const useAuthStore = create(set => ({
    token:sessionStorage.getItem("token") || null,
    loginId:sessionStorage.getItem("loginId") || null,
    login:(result)=>{
        sessionStorage.setItem("token",result.token);//session storage에 key:value 값으로 넣기
        sessionStorage.setItem("loginId",result.id);
        set({token:result.token, loginId:result.id});
    },
    logout:()=>{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("loginId");
        set({token:null,loginId:null});
    }
}));

export default useAuthStore;