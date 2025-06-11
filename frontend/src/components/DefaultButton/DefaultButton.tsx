import styles from './DefaultButton.module.scss';

import { ReactNode } from "react";

interface DefaultButtonProps {
  borderColor: string,
  padding?: string,
  children?: ReactNode,
}

export default function DefaultButton({ borderColor, padding = '0.5rem 1rem', children }: DefaultButtonProps) {

  return (
    <button className={styles.button}
    style={
      {
        "--border-color": borderColor,
        "padding": padding
      } as React.CSSProperties
    }>
        { children }
    </button>
  )
}