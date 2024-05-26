import { Metadata } from 'next';
import { getArticle, getWriter } from '@/libs/mirror';
import Article from '@/components/Article';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params.slug);

  return {
    title: article.title.rendered,
    description: article.excerpt.rendered,
    openGraph: {
      title: article.title.rendered,
      description: article.excerpt.rendered,
      images: article.jetpack_featured_media_url ?? "",
    },
  };
}

export default async function Page({ params }: Props) {
  const article = await getArticle(params.slug);
  const writer = await getWriter(article.author);

  return <Article article={article} writer={writer} />;
}
