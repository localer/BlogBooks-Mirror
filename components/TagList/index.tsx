import { Tag, getTag } from '@/libs/mirror';
import TagListItem from '../TagListItem';
import styles from './index.module.css';

type Props = {
  tagIds?: number[];
  tags?: Tag[];
  hasLink?: boolean;
  limit?: number;
};

export default async function TagList({ tagIds, tags, limit, hasLink = true }: Props) {
  if (!(tagIds || tags)) return null;

  if (!tags)
    tags = await Promise.all((tagIds as number[]).map(async id => await getTag(String(id))));

  if (limit)
    tags = tags.slice(0, limit);

  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag.id}>
          <TagListItem tag={tag} hasLink={hasLink} />
        </li>
      ))}
    </ul>
  );
}
