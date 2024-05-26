import Link from 'next/link';
import styles from './index.module.css';
import { totalpages } from '@/libs/mirror';

type Props = {
  current?: number;
  basePath?: string;
  q?: string;
};

export default function Pagination({ current = 1, basePath = '', q }: Props) {
  const pages = Array.from({ length: totalpages }).map((_, i) => i + 1);

  return (
    <ul className={styles.container}>
      {pages.map((p) => (
        <li className={styles.list} key={p}>
          {current !== p ? (
            <Link href={`${basePath}/p/${p}` + (q ? `?q=${q}` : '')} className={styles.item}>
              {p}
            </Link>
          ) : (
            <span className={`${styles.item} ${styles.current}`}>{p}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
