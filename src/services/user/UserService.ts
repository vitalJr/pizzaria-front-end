import { AxiosError } from 'axios';
import { api } from '../apiClient';
import { toast } from 'react-toastify';

interface UserProps {
  name: string;
  password: string;
  email: string;
}

class UserService {
  private url = 'http://localhost:3333';

  register = async ({ email, name, password }: UserProps) => {
    try {
      const response = await api.post(`${this.url}/user`, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      const responseError = error as AxiosError;
      return responseError.response?.data;
    }
  };

  getUserByToken = async (token: string) => {
    try {
      const response = await api.get(`${this.url}/me/${token}`);
      return response.data;
    } catch (error) {
      const responseError = error as AxiosError;
      return responseError.response?.data;
    }
  };
}

export default new UserService();
