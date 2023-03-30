import { AxiosError } from 'axios';
import { api } from '../apiClient';
import { toast } from 'react-toastify';

interface CategoryProps {
  name: string;
}

class CategoryService {
  private url = 'http://localhost:3333';

  async register(category: CategoryProps) {
    try {
      const response = await api.post(`${this.url}/category`, {
        name: category.name,
      });

      const c = response.data;
      toast.success(`${c.name} registered with success.`);

      return c;
    } catch (error) {
      const responseError = error as AxiosError;
      toast.error('Register error');
      return responseError.response?.data;
    }
  }
}

export default new CategoryService();
