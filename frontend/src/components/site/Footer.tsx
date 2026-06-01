import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          
          {/* BRAND */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl">🥢</span>
              <span className="font-black text-xl tracking-tighter uppercase italic">
                Asian <span className="text-brand">Way</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Đưa tinh hoa ẩm thực Châu Á vào không gian hiện đại. Chúng tôi tin rằng mỗi bữa ăn là một cuộc hành trình về văn hóa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand transition-all"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand transition-all"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand transition-all"><Twitter className="h-4 w-4" /></a>
            </div>
          </div>

          {/* QUICK LINKS - ĐÃ SỬA LỖI ĐỎ */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand mb-8">Khám phá</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/menu" className="hover:text-white flex items-center gap-1 group">Menu <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/about" className="hover:text-white flex items-center gap-1 group">About <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/contact" className="hover:text-white flex items-center gap-1 group">Reservations <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link to="/contact" className="hover:text-white flex items-center gap-1 group">Contact <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand mb-8">Liên hệ</h4>
            <ul className="space-y-5 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand shrink-0" />
                <span>123 Lantern Street, District 1, HCMC</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer hover:text-white">
                <Phone className="h-5 w-5 text-brand shrink-0" />
                <span>+84 (0) 90 123 4567</span>
              </li>
            </ul>
          </div>

          {/* HOURS & NEWSLETTER */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand mb-8">Giờ phục vụ</h4>
            <div className="text-sm text-gray-400 space-y-2 mb-8">
              <div className="flex justify-between"><span>Mon - Fri:</span><span className="text-white">11:00 - 22:30</span></div>
              <div className="flex justify-between border-b border-white/5 pb-2"><span>Sat - Sun:</span><span className="text-white">10:00 - 23:30</span></div>
            </div>
            <div className="relative group">
               <input type="email" placeholder="Email của bạn" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-brand transition-all" />
               <button className="absolute right-2 top-2 bottom-2 bg-brand text-white px-3 rounded-md text-xs font-bold">Gửi</button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-medium text-gray-500">
          <p>© {currentYear} THE ASIAN WAY STUDIO.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}