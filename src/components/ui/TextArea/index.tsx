import { TextareaHTMLAttributes } from 'react';
import style from './textarea.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ ...rest }: TextAreaProps) => {
  return <textarea className={style.textarea} {...rest}></textarea>;
};

export default TextArea;
