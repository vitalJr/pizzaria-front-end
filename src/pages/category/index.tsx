import { useState, FormEvent, useEffect } from 'react';

import Header from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import CategoryService from '@/services/category/CategoryService';
import { verifyConnection } from '@/utils/utils';
import { toast } from 'react-toastify';

interface Category {
  id: string;
  name: string;
}

const Category = () => {
  const [name, setName] = useState('');

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (!name) {
      toast.error('Write the category name.');
      return;
    }

    await CategoryService.register({ name });
    setName('');
  };

  useEffect(() => {
    verifyConnection();
  }, []);

  return (
    <>
      <Head>
        <title>New Category - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Register new category</h1>
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Write the category name'
              className={styles.input}
            />
            <button type='submit' className={styles.button}>
              Register
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Category;
