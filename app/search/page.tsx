import { getArticleSearch } from '@/libs/mirror';
import ArticleList from '@/components/ArticleList';
// import Pagination from '@/components/Pagination';
import { notFound } from 'next/navigation';

type Props = {
  searchParams: {
    q?: string;
  };
};

export const revalidate = 60;

export default async function Page({ searchParams }: Props) {
  if (!searchParams.q) return notFound();

  const keyword = decodeURIComponent(searchParams.q).trim();
  if (!keyword) return notFound();

  const articles = await getArticleSearch(keyword);

  return <ArticleList articles={articles} />;
}
