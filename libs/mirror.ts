/** 数字の正規表現 */
const numberReg = /^[0-9]+$/;
export let totalpages = 0;

import { notFound } from 'next/navigation';

/**
 * タグデータの型定義
 * 
 * @link https://blogbooks.net/wp-json/wp/v2/tags?_fields=id,name,slug
 */
export type Tag = {
  id: number,
  name: string,
  slug: string
}

/**
 * 投稿者データの型定義
 * 
 * @link https://blogbooks.net/wp-json/wp/v2/users?_fields=id,name,description,avatar_urls
 */
export type Writer = {
  id: number,
  name: string,
  description: string,
  avatar_urls: {
    24: string,
    48: string,
    96: string
  }
}

/**
 * 投稿データの型定義
 * 
 * @link https://blogbooks.net/wp-json/wp/v2/posts?_fields=id,date,title,content,excerpt,author,tags
 */
export type Article = {
  id: number,
  date: string,
  title: {
    rendered: string
  },
  content: {
    rendered: string,
    protected: boolean
  },
  excerpt: {
    rendered: string,
    protected: boolean
  },
  author: number,
  tags: number[],
  jetpack_featured_media_url: string;
}

/**
 * すべての投稿データを取得
 * @returns すべての投稿データ
 */
export const getArticles = async (pageId?: number): Promise<Article[]> => {
  try {
    const req = await fetch(`https://blogbooks.net/wp-json/wp/v2/posts?_fields=id,date,title,excerpt,author,tags,jetpack_featured_media_url${pageId ? `&page=${pageId}` : ""}`, {
      next: {
        revalidate: 60 * 60,
        tags: ["articles"]
      }
    });

    if (req.status != 200) throw new Error("ネットワークエラー");

    totalpages = Number(req.headers.get("x-wp-totalpages") as string);

    console.log(totalpages);

    return await req.json();
  } catch(e) {
    notFound();
  }
};

/**
 * 指定の投稿データを取得
 * @param contentId 投稿ID
 * @returns 投稿データ
 */
export const getArticle = async (contentId: string): Promise<Article> => {
  try {
    if (!numberReg.test(contentId)) throw new Error("投稿IDの整合性がありません");

    const req = await fetch(`https://blogbooks.net/wp-json/wp/v2/posts/${contentId}?_fields=id,date,title,content,excerpt,author,tags,jetpack_featured_media_url`, {
      next: {
        revalidate: 60 * 60,
        tags: ["articles", `article/${contentId}`]
      }
    });

    if (req.status != 200) throw new Error("ネットワークエラー");
    
    return await req.json();
  } catch(e) {
    notFound();
  }
};

export const getArticleSearch = async (keyword: string): Promise<Article[] | []> => {
  try {
    const formated_keyword = keyword.replace(/\s/, "+");

    const req = await fetch(`https://blogbooks.net/wp-json/wp/v2/posts?_fields=id,date,title,excerpt,author,tags,jetpack_featured_media_url&per_page=50&search=${formated_keyword}`, {
      next: {
        revalidate: 60 * 60,
        tags: ["articles", "article/search_cache"]
      }
    })

    return await req.json();
  } catch(e) {
    notFound();
  }
}

export const getArticleSearchByTag = async (tagId: string): Promise<Article[] | []> => {
  try {
    if (!numberReg.test(tagId)) throw new Error("タグIDの整合性がありません");

    const req = await fetch(`https://blogbooks.net/wp-json/wp/v2/posts?_fields=id,date,title,excerpt,author,tags,jetpack_featured_media_url&tags=${tagId}`, {
      next: {
        revalidate: 60 * 60,
        tags: ["articles", "article/search_cache"]
      }
    })

    return await req.json();
  } catch(e) {
    notFound();
  }
}

/**
 * すべてのタグデータを取得
 * @returns すべてのタグデータ
 */
export const getTags = async (): Promise<Tag[]> => {
  try {
    const req = await fetch("https://blogbooks.net/wp-json/wp/v2/tags?_fields=id,name,slug", {
      next: {
        revalidate: 60 * 60,
        tags: ["tags"]
      }
    });

    if (req.status != 200) throw new Error("ネットワークエラー");

    return await req.json();
  } catch(e) {
    notFound();
  }
};

/**
 * 指定のタグデータを取得
 * @param tagId タグID
 * @returns タグデータ
 */
export const getTag = async (tagId: string): Promise<Tag> => {
  try {
    if (!numberReg.test(tagId)) throw new Error("タグIDの整合性がありません");

    const req = await fetch(`https://blogbooks.net/wp-json/wp/v2/tags/${tagId}?_fields=id,name,slug`, {
      next: {
        revalidate: 60 * 60,
        tags: ["tags", `tag/${tagId}`]
      }
    });

    if (req.status != 200) throw new Error("ネットワークエラー");

    return await req.json();
  } catch(e) {
    notFound();
  }
};

/**
 * 指定の投稿者情報を表示
 * @param writerId 投稿者ID
 */
export const getWriter = async (writerId: string | number): Promise<Writer> => {
  try {
    if (!numberReg.test(String(writerId))) throw new Error("タグIDの整合性がありません");

    const req = await fetch(`https://blogbooks.net/wp-json/wp/v2/users/${writerId}?_fields=id,name,description,avatar_urls`, {
      next: {
        revalidate: 60 * 60,
        tags: ["writer", `writer/${writerId}`]
      }
    });

    if (req.status != 200) throw new Error("ネットワークエラー");

    return await req.json();
  } catch(e) {
    notFound();
  }
}