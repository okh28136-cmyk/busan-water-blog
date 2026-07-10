import { Metadata } from 'next';
import Link from 'next/link';

// 임시 데이터 (파이어베이스 연동 전)
const getDummyPost = (id: string) => {
  return {
    id,
    title: "해운대 사무실 생수 배달, 왜 부산생수일까요?",
    category: "Service",
    date: "2024-10-30",
    seoTitle: "부산 해운대 사무실 생수 배달 추천 - 부산생수",
    seoDescription: "부산 전 지역 맑고 깨끗한 생수를 사무실로 당일 배달해 드립니다. 해운대, 서면 등 빠른 배송 가능.",
    tags: ["부산생수", "해운대생수배달", "사무실생수"],
    thumbnail: "https://images.unsplash.com/photo-1548689816-c399f954f3dd?q=80&w=1200&auto=format&fit=crop",
    content: `
      <h2>깨끗한 물이 업무 효율을 높입니다</h2>
      <p>사무실에서 마시는 물 한 잔이 직장인들의 하루 컨디션을 좌우합니다. 부산생수는 엄격한 수질 검사를 통과한 맑고 깨끗한 암반수만을 제공합니다.</p>
      <ul>
        <li>당일 무료 배송 시스템</li>
        <li>정기적인 냉온수기 소독 및 관리</li>
        <li>합리적인 가격의 월 정기구독 서비스</li>
      </ul>
      <h3>왜 부산생수인가요?</h3>
      <p>단순히 물을 배달하는 것을 넘어, 고객님의 공간에 건강한 라이프스타일을 전달하고자 노력하고 있습니다. 지금 바로 상담받아보세요.</p>
    `
  };
};

// 네이버 및 구글 검색엔진 최적화(SEO)를 위한 메타태그 동적 생성
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = getDummyPost(id);

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription,
      images: [post.thumbnail],
      type: 'article',
      publishedTime: post.date,
    }
  };
}

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getDummyPost(id);

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
            {post.tags.map(tag => (
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
