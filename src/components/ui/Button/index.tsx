import style from './button.module.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

const Button = ({ loading = true, children, ...rest }: ButtonProps) => {
  return (
    <button className={style.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner color='#FFF' size={16} />
      ) : (
        <a className={style.buttonText}>{children}</a>
      )}
    </button>
  );
};

export default Button;
