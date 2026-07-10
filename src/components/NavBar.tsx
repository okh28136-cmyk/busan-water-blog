import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop py-5 max-w-container-max mx-auto left-0 right-0">
      <div className="flex items-center gap-12">
        <Link className="font-display-lg text-[24px] tracking-tight text-on-background font-black uppercase" href="/">
          Busan Water
        </Link>
        <div className="hidden md:flex gap-8 font-label-sm uppercase tracking-widest text-on-surface-variant">
          <Link className="hover:text-primary transition-colors duration-300" href="#">Our Water</Link>
          <Link className="hover:text-primary transition-colors duration-300" href="#">Delivery</Link>
          <Link className="hover:text-primary transition-colors duration-300" href="#">Health</Link>
          <Link className="text-on-background font-bold border-b-2 border-on-background" href="#">About Us</Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Link className="hidden md:inline-flex items-center justify-center font-label-sm uppercase tracking-widest text-on-background hover:text-primary transition-colors" href="/admin/login">
          Login
        </Link>
        <Link className="inline-flex items-center justify-center bg-primary text-on-primary px-6 py-3 font-label-sm uppercase tracking-widest hover:bg-on-background transition-colors duration-300" href="#">
          Subscribe
        </Link>
        <button className="md:hidden text-on-background p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
