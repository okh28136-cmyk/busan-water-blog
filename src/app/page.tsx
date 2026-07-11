import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';

export const revalidate = 10; // 10초마다 캐시 갱신 (빠른 업데이트 확인용)

async function getPosts() {
  const posts: any[] = [];
  try {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(6));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const date = data.createdAt ? new Date(data.createdAt.toMillis()).toISOString().split('T')[0] : "최근";
      
      // HTML에서 순수 텍스트만 추출하여 요약본 만들기
      const plainText = data.content.replace(/<[^>]+>/g, '');
      const excerpt = plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;

      posts.push({
        id: doc.id,
        title: data.title,
        category: data.category,
        thumbnail: data.thumbnail,
        excerpt: excerpt,
        date: date
      });
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="w-full bg-background overflow-hidden">
      
      {/* 1. Massive Asymmetric Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[150px] pb-section-gap flex flex-col md:flex-row items-end gap-12">
        <div className="w-full md:w-5/12 flex flex-col justify-end">
          <span className="font-label-sm tracking-widest text-primary mb-6">청정 프로젝트</span>
          <h1 className="font-display-lg text-[4rem] md:text-[5.5rem] leading-[1.1] tracking-tighter text-on-background mb-8 break-keep">
            물의 기준을 <br />
            다시 쓰다.
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-sm leading-relaxed mb-10 break-keep">
            부산생수배달은 바쁜 현대인들의 매일 마시는 물 습관을 개선하기 위해, 가장 맑고 깨끗한 물을 고객님의 책상 앞까지 안전하게 배달해 드립니다.
          </p>
          <Link href="#" className="font-label-sm tracking-widest text-on-background border-b border-on-background pb-1 hover:text-primary hover:border-primary transition-colors inline-block w-fit">
            수원지 알아보기
          </Link>
        </div>
        
        <div className="w-full md:w-7/12 relative aspect-[3/4] md:aspect-[4/3] group overflow-hidden bg-surface">
          <Image 
            alt="Hero Article Image" 
            fill
            className="object-cover image-scale-hover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXGu8sd52hdb1dbGbOsE7K7Z_CJMZoeY7UlrLHafv3a17GjGukvSQjKfM6hU-WYgcSpMWdbUeUlupCCLBt3_9wdpywTtOqolkWfL5ZuyWbmViFLzL_pKcn-LUO6lUQKgFbE5a6zYpJUFSpDcb0J71vx-G8sxW9g8fN9OSHTV_rA3WQlEc-GAITPci6j5sSoV2Ou0-7qmX9T3UcGI9EcNZNCz7MyhokSH8neYIMH7cKyjoDYpOFuuJPYiXS3I4piV5jyUkzubwo9zY" 
          />
        </div>
      </section>

      {/* 2. Blog Grid Section (3-column layout) */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap border-t border-outline-variant/30">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-headline-lg text-headline-lg tracking-tighter text-on-background">최신 소식.</h2>
          <span className="font-label-sm tracking-widest text-on-surface-variant hidden md:block">에디토리얼</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="flex flex-col group cursor-pointer">
                <Link href={`/posts/${post.id}`} className="w-full aspect-[4/3] relative overflow-hidden bg-surface mb-6 border border-outline-variant/20 rounded-lg">
                  {post.thumbnail ? (
                    <img 
                      alt={post.title} 
                      className="object-cover w-full h-full image-scale-hover" 
                      src={post.thumbnail} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-container text-secondary text-sm">
                      이미지 없음
                    </div>
                  )}
                </Link>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4 font-label-sm tracking-widest text-on-surface-variant">
                    <span>{post.date}</span>
                    <span className="w-4 h-[1px] bg-outline-variant"></span>
                    <span className="text-primary font-bold">{post.category}</span>
                  </div>
                  <Link href={`/posts/${post.id}`}>
                    <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3 break-keep">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-on-surface-variant">
              등록된 게시글이 없습니다. 관리자 페이지에서 첫 글을 작성해 보세요.
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
