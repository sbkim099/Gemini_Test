import { maxios } from "./axiosConfig";

export const getPostsList = (currentPage) => maxios.get("/board", {params: {cPage: currentPage}});