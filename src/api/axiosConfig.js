import axios from 'axios';

export const maxios = axios.create({
    baseURL: "http://localhost"
});
//요청이 서버로 출발하기 직전에 "잠깐 멈춰!" 하고 가로채는 역할
maxios.interceptors.request.use(config=>{
    //브라우저에서 토큰 겟
    const token = sessionStorage.getItem("token");
    //토큰 있다면
    if(token){
        //로그인한 사람임을 알려줌
        config.headers["Authorization"]= `Bearer ${token}`;
    }
    return config;
});