import { AxiosError } from 'axios';
import { api } from '../apiClient';

interface UserProps {
  name: string;
  password: string;
  email: string;
}

interface User {
  name: string;
}

interface Response {
  data: Object;
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

  getUserByToken = (token: string) => {
    try {
      api.get(`${this.url}/me/${token}`).then((response) => {
        return response.data;
      });
    } catch (error) {
      const responseError = error as AxiosError;
      return responseError.response?.data;
    }
  };
}

export default new UserService();
