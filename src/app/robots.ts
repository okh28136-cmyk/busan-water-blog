import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // 관리자 페이지는 검색엔진에서 제외
    },
    sitemap: 'https://busanwaterman.co.kr/sitemap.xml',
  };
}
