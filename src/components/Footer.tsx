import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-section-gap bg-on-background text-on-primary">
      <div className="flex flex-col md:flex-row justify-between items-start px-margin-mobile md:px-margin-desktop py-20 max-w-container-max mx-auto gap-12">
        <div className="flex flex-col gap-6">
          <span className="font-display-lg text-[2rem] font-black tracking-tighter">BUSAN WATER</span>
          <p className="font-label-sm text-on-primary/60 max-w-xs leading-relaxed uppercase tracking-widest">
            © 2024 Busan Pure Water.
            <br />
            Providing the purest hydration to the Busan community.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 font-label-sm uppercase tracking-widest text-on-primary/80">
          <div className="flex flex-col gap-4">
            <span className="text-on-primary font-bold mb-2">Legal</span>
            <Link className="hover:text-primary transition-all" href="#">Terms of Service</Link>
            <Link className="hover:text-primary transition-all" href="#">Privacy Policy</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-on-primary font-bold mb-2">Social</span>
            <Link className="hover:text-primary transition-all" href="#">Instagram</Link>
            <Link className="hover:text-primary transition-all" href="#">Facebook</Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-on-primary font-bold mb-2">Support</span>
            <Link className="hover:text-primary transition-all" href="#">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
