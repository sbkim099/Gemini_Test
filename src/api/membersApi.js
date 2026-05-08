import { maxios } from "./axiosConfig";

// 백엔드 컨트롤러의 @GetMapping("/{id}") 구조에 맞춰 URL 경로에 id를 포함합니다.
// @RequestMapping("/Members") 이므로 전체 경로는 /Members/{id} 가 됩니다.
export const isIdExist = (id) => maxios.get(`/Members/${id}`);
