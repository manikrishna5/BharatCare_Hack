import api from "./axios";

export const searchMedicines = async (query: string) => {
  const token = localStorage.getItem("token");

  const res = await api.get(`/medicines/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};