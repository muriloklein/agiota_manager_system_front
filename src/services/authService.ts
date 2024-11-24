import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api/webmob";

export const authService = {
  login: async (params: { name: string; pin: string }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, params);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response;
      }
    }
  },

  async register(params: { name: string; pin: string }) {
    try {
      const response = await axios.post(`${API_URL}/register`, params);
      if (response.status === 201) {
        return response;
      }
      console.log(response);
    } catch (error: any) {
      console.error(
        "Erro ao registrar o usuário:",
        error.response?.data || error.message
      );
      return null;
    }
  },
};
