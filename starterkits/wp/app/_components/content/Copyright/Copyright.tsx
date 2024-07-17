import { JSX } from 'react';
import styles from './copyright.module.css';

const YEAR = new Date().getFullYear();
interface CopyrightProps {
  title: string;
}

function Copyright({ title }: CopyrightProps): JSX.Element | null {
  return (
    <div className={styles.copyright}>
      <hr />
      <p>
        &copy; {YEAR} {title}
      </p>
    </div>
  );
}

export default Copyright;
