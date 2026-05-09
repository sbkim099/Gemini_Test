import { maxios } from "./axiosConfig";

export const getPostsList = (currentPage) => maxios.get("/board", {params: {cPage: currentPage}});
export const getPostDetail = (seq) => maxios.get(`/board/${seq}`);
export const addPost = (contents) => maxios.post("/board", contents);
export const updatePost = (seq, editMsg) => maxios.put(`/board/${seq}`, editMsg);
export const deletePost = (seq) => maxios.delete(`/board/${seq}`);