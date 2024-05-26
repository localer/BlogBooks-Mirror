import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/libs/mirror';
import styles from './index.module.css';
import TagList from '../TagList';
import PublishedDate from '../Date';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <li className={styles.list}>
      <Link href={`/articles/${article.id}`} className={styles.link}>
        {/* サムネイル画像 */}
        <Image
          className={styles.image}
          src={article.jetpack_featured_media_url != "" ? article.jetpack_featured_media_url : "/no-image.png"}
          alt="サムネイル画像"
          width={1200}
          height={630}
        />

        {/* 投稿日時 */}
        <dl className={styles.content}>
          <dt className={styles.title}>{article.title.rendered}</dt>
          <dd>
            <TagList tagIds={article.tags} limit={5} hasLink={false} />
          </dd>
          <dd className={styles.date}>
            <PublishedDate date={article.date} />
          </dd>
        </dl>
      </Link>
    </li>
  );
}
