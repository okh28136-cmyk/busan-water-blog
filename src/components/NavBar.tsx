import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop py-5 max-w-container-max mx-auto left-0 right-0">
      <div className="flex items-center gap-12">
        <Link className="font-display-lg text-[24px] tracking-tight text-on-background font-black" href="/">
          부산생수
        </Link>
        <div className="hidden md:flex gap-8 font-label-sm tracking-widest text-on-surface-variant">
          <Link className="hover:text-primary transition-colors duration-300" href="#">우리 생수</Link>
          <Link className="hover:text-primary transition-colors duration-300" href="#">배달 안내</Link>
          <Link className="hover:text-primary transition-colors duration-300" href="#">건강 정보</Link>
          <Link className="text-on-background font-bold border-b-2 border-on-background" href="#">회사 소개</Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link className="hidden md:inline-flex items-center justify-center font-label-sm tracking-widest text-on-background hover:text-primary transition-colors" href="/admin/login">
          관리자 로그인
        </Link>
        <Link className="inline-flex items-center justify-center bg-primary text-on-primary px-6 py-3 font-label-sm tracking-widest hover:bg-on-background transition-colors duration-300" href="#">
          정기구독 신청
        </Link>
        <button className="md:hidden text-on-background p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
