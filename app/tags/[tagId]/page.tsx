import { getArticleSearchByTag } from '@/libs/mirror';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    tagId: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const { tagId } = params;
  const articles = await getArticleSearchByTag(tagId);

  return <ArticleList articles={articles} />;
}
