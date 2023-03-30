import { FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';
import logo from '../../../public/logo.svg';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { toast } from 'react-toastify';

import Link from 'next/link';
import UserService from '@/services/user/UserService';
import Router from 'next/router';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  const [loading, setLoading] = useState(false);

  const registerHandler = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning('Mandatory fields empty.');
      return;
    }

    if (email.toLocaleLowerCase() !== confirmEmail.toLocaleLowerCase()) {
      toast.warning('E-mail is not equals.');
      return;
    }

    if (password !== confirmPassword) {
      toast.warning('Password not match.');
      return;
    }

    setLoading(true);

    const user = await UserService.register({ email, name, password });

    !user.error && toast.success('User registered with sucess.');

    setLoading(false);

    if (user.error) {
      toast.error(user.error);
      return;
    }

    Router.push('/');
  };

  const onChangeFields = (value: string, field: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'confirmEmail':
        setConfirmEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt='Sujeito pizzaria' />

        <div className={styles.login}>
          <h1>Create your account</h1>

          <form onSubmit={registerHandler}>
            <Input
              placeholder='Your Name'
              type='text'
              value={name}
              onChange={(e) => onChangeFields(e.target.value, 'name')}
            />
            <Input
              placeholder='E-mail'
              type='text'
              value={email}
              onChange={(e) => onChangeFields(e.target.value, 'email')}
            />
            <Input
              placeholder='Confirm your e-mail'
              type='text'
              value={confirmEmail}
              onChange={(e) => onChangeFields(e.target.value, 'confirmEmail')}
            />
            <Input
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => onChangeFields(e.target.value, 'password')}
            />
            <Input
              placeholder='ConfirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) =>
                onChangeFields(e.target.value, 'confirmPassword')
              }
            />
            <Button loading={loading} type='submit'>
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
