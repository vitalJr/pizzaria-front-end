import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';
import logo from '../../../public/logo.svg';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

import Link from 'next/link';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Sujeito pizzaria' />

        <div className={styles.login}>
          <h1>Create your account</h1>
          <form>
            <Input placeholder='Your Name' type='text' />
            <Input placeholder='E-mail' type='text' />
            <Input placeholder='Password' type='password' />
            <Input placeholder='Confirm your e-mail' type='password' />
            <Button loading={false} type='submit'>
              Register
            </Button>
          </form>
          <Link className={styles.text} href='/'>
            Already have an account? Go to login
          </Link>
        </div>
      </div>
    </>
  );
}
