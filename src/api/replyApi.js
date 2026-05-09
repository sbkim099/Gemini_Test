import { maxios } from "./axiosConfig";

export const getReplyByParentSeq = (seq) => maxios.get("/reply/" + seq);
export const postReply = (newReply) => maxios.post("/reply", newReply);
export const putReply = (seq, contents) => maxios.put("/reply", {seq, contents});
export const deleteReply = (seq) => maxios.delete("/reply/" + seq);