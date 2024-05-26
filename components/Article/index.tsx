import { formatRichText } from '@/libs/utils';
import type { Article, Writer } from '@/libs/mirror';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';
import Profile from '../Profile';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { parse } from 'dom-parser-react';

type Props = {
  article: Article;
  writer: Writer;
};

export default function Article({ article, writer }: Props) {
  const articleContent = useMemo(() => formatRichText(article.content.rendered), [article.content.rendered])

  return (
    <main className={styles.main}>
      {/* タイトル */}
      <h1 className={styles.title}>{article.title.rendered}</h1>

      {/* タグ */}
      <TagList tagIds={article.tags} />

      {/* 投稿抜粋 */}
      <p className={styles.description}>{article.excerpt.rendered}</p>

      {/* メタデータ: 投稿者情報 & 投稿日時 */}
      <div className={styles.meta}>
        {/* 投稿者情報 */}
        <div className={styles.writer}>
          <Image src={writer.avatar_urls[24]} alt={`${writer.name}のアイコン`} className={styles.writerIcon} width={128} height={128} />
          <span className={styles.writerName}>{writer.name}</span>
        </div>
        {/* 投稿日時 */}
        <PublishedDate date={article.date} />
      </div>

      {/* 投稿内容 */}
      { article.jetpack_featured_media_url != "" && <Image src={article.jetpack_featured_media_url} alt="サムネイル画像" className={styles.thumbnail} width={14467} height={9744} />}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: `${articleContent}`,
        }}
      />

      {/* 投稿者情報 */}
      <Profile writer={writer} />
    </main>
  );
}
