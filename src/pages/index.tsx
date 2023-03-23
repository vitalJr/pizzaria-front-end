import { useContext, FormEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import logo from '../../public/logo.svg';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

import { AuthContext } from './contexts/AuthContext';

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    await signIn({ email: 'teste', password: '123456' });
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
            <Input placeholder='E-mail' type='text' />
            <Input placeholder='Password' type='password' />
            <Button loading={false} type='submit'>
              {' '}
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
