import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full bg-background overflow-hidden">
      
      {/* 1. Massive Asymmetric Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-[150px] pb-section-gap flex flex-col md:flex-row items-end gap-12">
        <div className="w-full md:w-5/12 flex flex-col justify-end">
          <span className="font-label-sm uppercase tracking-widest text-primary mb-6">The Purity Project</span>
          <h1 className="font-display-lg text-[4rem] md:text-[5.5rem] leading-[0.95] tracking-tighter text-on-background uppercase mb-8">
            Water, <br />
            Redefined.
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-sm leading-relaxed mb-10">
            The BUSAN WATER project aims to improve the daily hydration routines of modern professionals, delivering crisp, pure water straight to your desk.
          </p>
          <Link href="#" className="font-label-sm uppercase tracking-widest text-on-background border-b border-on-background pb-1 hover:text-primary hover:border-primary transition-colors inline-block w-fit">
            Discover Our Source
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
          <h2 className="font-headline-lg text-headline-lg tracking-tighter text-on-background">Latest Posts.</h2>
          <span className="font-label-sm uppercase tracking-widest text-on-surface-variant hidden md:block">Editorial</span>
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
              <div className="flex items-center gap-3 mb-4 font-label-sm uppercase tracking-widest text-on-surface-variant">
                <span>Oct 30, 2024</span>
                <span className="w-4 h-[1px] bg-outline-variant"></span>
                <span className="text-primary font-bold">Service</span>
              </div>
              <Link href="/posts/1">
                <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                  해운대 사무실 생수 배달, 왜 부산생수일까요?
                </h3>
              </Link>
              <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3">
                Modern businesses require reliable hydration solutions. Busan Water provides seamless delivery services to Haeundae offices, ensuring your team stays refreshed and productive all day.
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
              <div className="flex items-center gap-3 mb-4 font-label-sm uppercase tracking-widest text-on-surface-variant">
                <span>Oct 20, 2024</span>
                <span className="w-4 h-[1px] bg-outline-variant"></span>
                <span className="text-primary font-bold">Health</span>
              </div>
              <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                건강한 생활을 위한 올바른 물 섭취 가이드
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3">
                Proper hydration is the foundation of good health. Learn how establishing a consistent water drinking routine can elevate your daily energy levels and overall wellbeing.
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
              <div className="flex items-center gap-3 mb-4 font-label-sm uppercase tracking-widest text-on-surface-variant">
                <span>Oct 15, 2024</span>
                <span className="w-4 h-[1px] bg-outline-variant"></span>
                <span className="text-primary font-bold">About</span>
              </div>
              <h3 className="font-article-title text-[1.75rem] leading-[1.3] tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
                부산의 깨끗한 수원지를 찾아서 떠나는 여정
              </h3>
              <p className="text-on-surface-variant font-body-md leading-relaxed line-clamp-3">
                Tracing the origins of our purity. We explore the pristine natural springs surrounding Busan that provide the crisp, clean taste our customers trust every day.
              </p>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
