import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-section-gap bg-on-background text-on-primary">
      <div className="flex flex-col md:flex-row justify-between items-start px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto gap-12">
        <div className="flex flex-col gap-6">
          <span className="font-display-lg text-[2rem] font-black tracking-tighter">부산생수배달</span>
          <p className="font-label-sm text-on-primary/60 max-w-xs leading-relaxed tracking-widest">
            © 2024 부산생수배달.
            <br />
            부산 지역에 가장 깨끗한 물을 제공합니다.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 font-label-sm tracking-widest text-on-primary/80">
          <div className="flex flex-col gap-4">
            <span className="text-on-primary font-bold mb-2">이용 안내</span>
            <Link className="hover:text-primary transition-all" href="#">이용약관</Link>
            <Link className="hover:text-primary transition-all" href="#">개인정보처리방침</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-on-primary font-bold mb-2">소셜 미디어</span>
            <Link className="hover:text-primary transition-all" href="#">인스타그램</Link>
            <Link className="hover:text-primary transition-all" href="#">페이스북</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-on-primary font-bold mb-2">고객 지원</span>
            <Link className="hover:text-primary transition-all" href="#">문의하기</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
