import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import logo from '../../public/logo.svg';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { toast } from 'react-toastify';

import { AuthContext } from './contexts/AuthContext';

import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning('Mandatory fields is empty.');
      return;
    }

    setLoading(true);

    await signIn({ email, password });

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>SujeitoPizza</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Sujeito pizzaria' />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='E-mail'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button loading={loading} type='submit'>
              Login
            </Button>
          </form>
          <Link className={styles.text} href='/signup'>
            Não possui uma conta? cadastre-se
          </Link>
        </div>
      </div>
    </>
  );
}

export const canAccessGuest: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);

  if (cookies['@camilo.token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
