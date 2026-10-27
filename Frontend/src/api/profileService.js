import api from "./api";

export const getProfile = () => api.get("/api/profile");
export const updateProfile = (profile) => api.put("/api/profile", profile);
