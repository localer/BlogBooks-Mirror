import { getArticles } from '@/libs/mirror';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

export const revalidate = 60;

export default async function Page() {
  const articles = await getArticles();
  return (
    <>
      <ArticleList articles={articles} />
      <Pagination />
    </>
  );
}
