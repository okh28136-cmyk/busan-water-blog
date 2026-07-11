import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export const revalidate = 10;

async function getPost(id: string) {
  try {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    const date = data.createdAt ? new Date(data.createdAt.toMillis()).toISOString().split('T')[0] : "최근";
    
    return {
      id: docSnap.id,
      title: data.title,
      category: data.category,
      date,
      seoTitle: data.seoTitle || data.title,
      seoDescription: data.seoDescription || "",
      tags: data.tags || [],
      thumbnail: data.thumbnail || null,
      content: data.content || ""
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

// 네이버 및 구글 검색엔진 최적화(SEO)를 위한 메타태그 동적 생성
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription,
      images: post.thumbnail ? [post.thumbnail] : [],
      type: 'article',
      publishedTime: post.date,
    }
  };
}

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* 썸네일 헤더 영역 (에디토리얼 풀-블리드) */}
      {post.thumbnail && (
        <div className="w-full h-[60vh] md:h-[70vh] relative">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24">
            <div className="max-w-container-max w-full px-margin-mobile md:px-margin-desktop">
              <span className="inline-block font-label-sm uppercase tracking-widest text-primary mb-6">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display-lg font-black text-white leading-[1.1] tracking-tighter max-w-[900px] break-keep mb-8">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/80 font-label-sm uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-12 h-[1px] bg-white/30"></span>
                <span>작성자: 부산생수</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 썸네일이 없는 경우의 기본 헤더 */}
      {!post.thumbnail && (
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-24 pb-12 text-center border-b border-outline-variant/30">
           <span className="inline-block px-4 py-1 bg-surface-container-high text-primary text-sm font-bold rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-headline-lg font-bold text-on-background leading-tight max-w-[800px] mx-auto break-keep">
            {post.title}
          </h1>
          <p className="text-on-surface-variant mt-6 text-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            {post.date}
          </p>
        </div>
      )}

      {/* 본문 영역 */}
      <div className="max-w-[800px] mx-auto px-margin-mobile md:px-margin-desktop mt-12 md:mt-16">
        <div 
          className="tiptap max-w-none text-on-surface text-lg leading-relaxed break-keep"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 태그 영역 */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-20 pt-8 border-t border-outline-variant/30 flex flex-wrap gap-2 items-center">
            <span className="material-symbols-outlined text-secondary mr-2">sell</span>
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 bg-surface-container-low text-on-surface-variant text-sm rounded-full border border-outline-variant/20 hover:bg-surface-container-high hover:text-primary cursor-pointer transition-colors shadow-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 하단 네비게이션 */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/" 
            className="px-8 py-4 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container transition-colors shadow-md flex items-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </article>
  );
}
