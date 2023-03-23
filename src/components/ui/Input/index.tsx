import { InputHTMLAttributes } from 'react';
import style from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: InputProps) => {
  return <input className={style.input} type='text' {...rest} />;
};

export default Input;
