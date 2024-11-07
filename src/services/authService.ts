// authService.ts
import axios from "axios";

export const authService = {
  login: async (params: { name: string; pin: string }) => {
    try {
      const response = await axios.get("/api/login", { params });
      return response;
    } catch (error) {
      return error.response;
    }
  },
};
