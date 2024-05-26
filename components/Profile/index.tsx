import Image from 'next/image';
import styles from './index.module.css';
import { Writer } from '@/libs/mirror';

type Props = {
  writer?: Writer;
};

export default function Profile({ writer }: Props) {
  if (!writer) return null;

  return (
    <div className={styles.wrapper}>
      <Image src={writer.avatar_urls[24]} alt={`${writer.name}のアイコン`} className={styles.writerIcon} width={128} height={128} />

      <div className={styles.content}>
        <p className={styles.name}>{writer.name}</p>
        <p className={styles.profile}>{writer.description}</p>
      </div>
    </div>
  );
}
