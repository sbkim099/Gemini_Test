import { maxios } from "./axiosConfig";

// 백엔드 컨트롤러의 @GetMapping("/{id}") 구조에 맞춰 URL 경로에 id를 포함합니다.
// @RequestMapping("/members") 이므로 전체 경로는 /members/{id} 가 됩니다.
export const isIdExist = (id) => maxios.get(`/members/idExist/${id}`);
export const insertForm = (formData) => maxios.post("/members",formData);
export const isLogin = (user) => maxios.post("/auth/login",user);
export const deleteMember = (id) => maxios.delete(`/members/${id}`);
export const getProfile = (id) => maxios.get(`/members/${id}`);
export const upProfile = (id, upData) => maxios.put("/members/"+id,upData);