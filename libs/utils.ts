import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

/**
 * 日付を日本式に置き換え
 * 
 * @param date 
 * @returns 
 */
export const formatDate = (date: string) => {
  const utcDate = new Date(date);
  return `${utcDate.getFullYear()}年${utcDate.getMonth() + 1}月${utcDate.getDate()}日`;
};

/**
 * テキストのリッチフォーマット
 * @param richText 
 * @returns 
 */
export const formatRichText = (richText: string) => {
  const $ = cheerio.load(richText);

  /* コードハイライト */
  const highlight = (text: string, lang?: string) => {
    if (!lang) return hljs.highlightAuto(text);
    try {
      return hljs.highlight(text, { language: lang?.replace(/^language-/, '') || '' });
    } catch (e) {
      return hljs.highlightAuto(text);
    }
  };
  $("pre code").each((_, elm) => {
    const lang = $(elm).attr('class');
    const res = highlight($(elm).text(), lang);
    $(elm).html(res.value);
  });

  /* 画像のパフォーマンス向上 & Proxy */
  $("img").each((_, elm) => {
    const src = $(elm).attr("src");

    if (src) {
      if (!src.includes("/_next/image")) {
        $(elm).removeAttr("srcset");

        if (URL.canParse(src)) {
          $(elm).attr("src", "/_next/image?url=" + src + "&w=3840&q=100");
        } else {
          $(elm).attr("src", "/no-image.png");
        }
      }
    } else {
      $(elm).attr("src", "/no-image.png");
    }
  })

  return $.html();
};