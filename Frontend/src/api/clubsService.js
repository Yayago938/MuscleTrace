import api from "./api";

export const getClubs = (q = "", page = 1) => api.get("/api/clubs", { params: { q, page } });
export const getMyClubs = () => api.get("/api/clubs/mine");
export const createClub = (club) => api.post("/api/clubs", club);
export const joinClub = (id) => api.post(`/api/clubs/${id}/join`);
export const leaveClub = (id) => api.post(`/api/clubs/${id}/leave`);
