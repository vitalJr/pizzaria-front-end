import { signOut } from '@/pages/contexts/AuthContext';
import UserService from '@/services/user/UserService';
import { parseCookies } from 'nookies';

export const verifyConnection = async () => {
  const { '@camilo.token': token } = parseCookies();

  if (token) {
    const user = await UserService.getUserByToken(token);
    if (!user) {
      signOut();
    }
  } else {
    signOut();
  }
};

async function teste() {}
