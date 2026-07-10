import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
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
            부산생수는 바쁜 현대인들의 매일 마시는 물 습관을 개선하기 위해, 가장 맑고 깨끗한 물을 고객님의 책상 앞까지 안전하게 배달해 드립니다.
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
          
          {/* Article 1 */}
          <article className="flex flex-col group cursor-pointer">
            <Link href="/posts/1" className="w-full aspect-[4/3] relative overflow-hidden bg-surface mb-6">
              <Image 
                alt="Article 1" 
                fill
                className="object-cover image-scale-hover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ65mwIo9JLS7h4mSs9M0QV3B7iSme-pXbXNyMu_gpubS3QaEQ44W_44hWb9SEYVDRvZ6NvPkyv_aKuH_JmjwKtHtNU7h6fmWtyLh-cxn-VLakEKoeA3NcZuP2Eq6ON_fXg4mcDtsIUsJxDwyic3y8nZso72B_5QYNkMfwjvpvuYUGLickj9slpoZnYOKd5eKazJ_KZ8qdlY8bs-mu6MBQjGPWyCP7SBx1CTDfZJ65WqiqoaXXYS7Knn8Wwd8J96F5BkYPvquOlMQ" 
              />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4 font-label-sm tracking-widest text-on-surface-variant">
                <span>2024년 10월 30일</span>
                <span className="w-4 h-[1px] bg-outline-variant"></span>
                <span className="text-primary font-bold">서비스안내</span>
              </div>
              <Link href="/posts/1">
                <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                  해운대 사무실 생수 배달, 왜 부산생수일까요?
                </h3>
              </Link>
              <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3 break-keep">
                사무실에서의 안정적인 수분 공급은 기업의 생산성과 직결됩니다. 부산생수는 해운대 전 지역 사무실에 끊김 없는 배달 서비스를 제공하여, 여러분의 팀이 하루 종일 상쾌한 컨디션을 유지할 수 있도록 돕습니다.
              </p>
            </div>
          </article>

          {/* Article 2 */}
          <article className="flex flex-col group cursor-pointer">
            <div className="w-full aspect-[4/3] relative overflow-hidden bg-surface mb-6">
              <Image 
                alt="Article 2" 
                fill
                className="object-cover image-scale-hover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACMz4vwDz4xe50Fms-B74Z5qezlOyIgy9kK4B7Zhq5eYAP_Y4L-IkWrqjxHFmSsJn_WwzHrxuk0VLgXiWw5GDBbxOwJi75DT8PmFp-zT4tVF1gukvNe5a4WuQ52Fi4dk1jlnPI-KaDCyKPaoFvn1hkzYUS4zVP_lSSwpBaCONf75l86stzHugXvAHfj0KWXqzHUMWbUstkDTsn0noOJ-dDoWOgzlW09bGLPUlhgwyYnuZVS310lb1N-K3ByS1kcChno2xM6xJL4ds" 
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4 font-label-sm tracking-widest text-on-surface-variant">
                <span>2024년 10월 20일</span>
                <span className="w-4 h-[1px] bg-outline-variant"></span>
                <span className="text-primary font-bold">건강정보</span>
              </div>
              <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                건강한 생활을 위한 올바른 물 섭취 가이드
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3 break-keep">
                올바른 수분 섭취는 건강의 기본입니다. 규칙적으로 물을 마시는 습관이 어떻게 일상의 에너지를 높이고 전반적인 웰빙을 향상시킬 수 있는지 알아보세요.
              </p>
            </div>
          </article>

          {/* Article 3 */}
          <article className="flex flex-col group cursor-pointer">
            <div className="w-full aspect-[4/3] relative overflow-hidden bg-surface mb-6">
              <Image 
                alt="Article 3" 
                fill
                className="object-cover image-scale-hover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWpdBv_z29AGWXD1SCzvS2oOpLzHKKGQ8B-_zGmgPamwTPqsJxpnk29mFLu7C_ZxdyV97QgnHF7d7CDUBSlTRqg73vUPHQ99MYrG0zHCRqPzihhzkyye0RyUZ1r4X6UJ9jwrQ_EZA3t-xzf0LC9t4Pxeuvpb44sIpYR8Rkg4B04FfX0HKhOaF96fhYYqbEgL4KdeeuboppLAx0W89T94Lpct7VSC6rfmm217grhwpPRQphQ7IIFZYjswIWr8fL9YxOGFYkJi7i7oo" 
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4 font-label-sm tracking-widest text-on-surface-variant">
                <span>2024년 10월 15일</span>
                <span className="w-4 h-[1px] bg-outline-variant"></span>
                <span className="text-primary font-bold">회사소개</span>
              </div>
              <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                부산의 깨끗한 수원지를 찾아서 떠나는 여정
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3 break-keep">
                부산생수의 맑고 깨끗함이 시작되는 곳. 고객님들이 매일 믿고 마시는 시원하고 깔끔한 물맛의 비밀을 찾아 부산 인근의 청정 수원지를 탐방합니다.
              </p>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
