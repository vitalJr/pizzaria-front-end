import { useContext } from 'react';
import style from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.svg';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '@/pages/contexts/AuthContext';

const Header = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <header className={style['header-container']}>
      <div className={style['header-content']}>
        <Link href={'/dashboard'}>
          <Image
            src={logo}
            alt='Sujeito pizzaria'
            width={190}
            height={60}
            className={style.imageLogo}
          />
        </Link>
        <nav className={style.menuNav}>
          <Link href={'/category'}>Category</Link>
          <Link href={'/product'}>Menu</Link>
          <button onClick={signOut}>
            <FiLogOut color='#FFF' size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
