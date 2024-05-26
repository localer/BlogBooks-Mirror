import { getArticles } from '@/libs/mirror';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: {
    current: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const currentPageId = parseInt(params.current as string, 10);
  const articles = await getArticles(currentPageId);
  return (
    <>
      <ArticleList articles={articles} />
      <Pagination current={currentPageId} />
    </>
  );
}
