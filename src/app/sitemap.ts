import { MetadataRoute } from 'next';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://busanwaterman.co.kr';
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sitemapData.push({
        url: `${baseUrl}/posts/${doc.id}`,
        lastModified: data.createdAt ? new Date(data.createdAt.toMillis()) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('Sitemap generation failed:', error);
  }

  return sitemapData;
}
