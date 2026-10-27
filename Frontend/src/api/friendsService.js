import api from "./api";

export const searchUsers = (q, page = 1) => api.get("/api/users/search", { params: { q, page } });
export const getFriends = (page = 1) => api.get("/api/friends", { params: { page } });
export const addFriend = (id) => api.post(`/api/friends/${id}`);
export const removeFriend = (id) => api.delete(`/api/friends/${id}`);
export const getFriendProfile = (id) => api.get(`/api/friends/${id}/profile`);
