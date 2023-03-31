import { useState, useEffect, ChangeEvent } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import { verifyConnection } from '@/utils/utils';

import { FiUpload } from 'react-icons/fi';

const Product = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [bannersetBanner] = useState('');

  useEffect(() => {
    verifyConnection();
  });

  const [imageUrl, setImageUrl] = useState('');
  const [imageAvatar, setAvatar] = useState<File>();

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const images = event.target.files[0];

    if (!images) {
      return;
    }

    if (images.type === 'image/jpeg' || images.type === 'image/png') {
      setAvatar(images);
      setImageUrl(URL.createObjectURL(imageAvatar!));
    }
  };

  return (
    <>
      <Head>
        <title>New Product - Sujeito Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Register a new product</h1>
          <form className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color='#FFF' />
              </span>
              <input
                type='file'
                accept='image/png, image/jpeg'
                onChange={handleFile}
              />

              {imageUrl && (
                <img
                  className={styles.preview}
                  src={imageUrl}
                  alt='Product Image'
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select>
              <option>bebida</option>
              <option>bebida</option>
            </select>
            <input
              type='text'
              placeholder='product name'
              className={styles.input}
            />
            <input
              type='text'
              placeholder='product price'
              className={styles.input}
            />
            <textarea
              placeholder='product description'
              className={styles.input}
            ></textarea>
            <button className={styles.buttonAdd} type='submit'>
              Register
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default Product;
