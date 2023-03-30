import { api } from '../apiClient';

interface SessionProps {
  email: string;
  password: string;
}

class SessionService {
  private url = 'http://localhost:3333';

  login = async (data: SessionProps) => {
    const response = await api.post(`${this.url}/session`, {
      email: data.email,
      password: data.password,
    });

    if (response.data) {
      const { token } = response.data;
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return response.data;
  };
}

export default new SessionService();
