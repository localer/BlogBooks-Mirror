import { getTags } from '@/libs/mirror';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'BlogBooks Library - ミラーサイト',
  description: 'BlogBooks Libraryの投稿データをミラーリングしているサイト。投稿データは1時間キャッシュなので、DoS/DDoS対策は万全。',
  openGraph: {
    title: 'BlogBooks Library - ミラーサイト',
    description: 'BlogBooks Libraryの投稿データをミラーリングしているサイト。投稿データは1時間キャッシュなので、DoS/DDoS対策は万全。',
  },
  alternates: {
    canonical: "/",
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTags();

  return (
    <html lang="ja">
      <body>
        <Header />
        <Nav tags={tags} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
