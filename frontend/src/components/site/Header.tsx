import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X, CalendarCheck, Utensils } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart.store";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((s, it) => s + it.quantity, 0);

  // 1. Theo dõi vị trí cuộn trang
  const { scrollY } = useScroll();
  
  // 2. Tạo hiệu ứng: Khi cuộn từ 0px đến 100px, dải Marquee sẽ mờ dần và thu nhỏ chiều cao
  const marqueeOpacity = useTransform(scrollY, [0, 50], [1, 0]);
  const marqueeHeight = useTransform(scrollY, [0, 50], ["auto", 0]);
  const marqueeDisplay = useTransform(scrollY, (latest) => (latest > 50 ? "none" : "block"));

  const linkClass = "text-sm font-bold uppercase tracking-widest hover:text-brand transition-colors data-[status=active]:text-brand";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-brand flex items-center justify-center text-white shadow-lg shadow-brand/20 transition-transform group-hover:scale-105">
              <Utensils className="h-6 w-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-xl tracking-tighter uppercase">
                ASIAN <span className="text-brand">WAY</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] font-black opacity-40 mt-1">
                Hanoi Service
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link to="/about" className={linkClass}>About</Link>
            <Link to="/menu" className={linkClass}>Menu</Link>
            <Link to="/contact" className={linkClass}>Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 rounded-xl border-2 border-brand px-5 py-2 text-xs font-black uppercase tracking-wider hover:bg-brand"
            >
              <CalendarCheck className="w-4 h-4" />
              Reservations
            </Link>

            <Link
              to="/menu"
              className="hidden sm:block rounded-xl bg-zinc-900 text-white px-6 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-brand transition shadow-lg shadow-zinc-900/10"
            >
              Order Online
            </Link>
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-white hover:text-slate-950 transition"
            >
              Admin Login
            </Link>
            <div className="flex items-center ml-2 border-l pl-4 border-border">
              <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-full transition mr-2 group">
                <ShoppingBag className="h-5 w-5 group-hover:text-brand transition-colors" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 h-5 w-5 grid place-items-center text-[10px] font-black rounded-full bg-brand text-zinc-950 border-2 border-background shadow-sm"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              <button className="md:hidden p-2" onClick={() => setOpen((o) => !o)}>
                {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-background border-t border-border"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <Link to="/about" onClick={() => setOpen(false)} className="text-2xl font-black uppercase tracking-tighter">About</Link>
                <Link to="/menu" onClick={() => setOpen(false)} className="text-2xl font-black uppercase tracking-tighter">Menu</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="text-2xl font-black uppercase tracking-tighter">Contact</Link>
                <Link to="/admin/login" onClick={() => setOpen(false)} className="text-2xl font-black uppercase tracking-tighter">Admin</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MARQUEE: Sẽ ẩn khi cuộn xuống */}
      <motion.div 
        style={{ 
          opacity: marqueeOpacity, 
          height: marqueeHeight,
          display: marqueeDisplay 
        }}
        className="bg-brand text-black overflow-hidden py-2.5 border-y border-black/5 shadow-xl origin-top"
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="whitespace-nowrap flex gap-16 will-change-transform items-center"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="tracking-[0.3em] uppercase text-[10px] font-black">
                Haidilao Style Service • Late Night Dining • Free Delivery • Fresh Ingredients • Genuine Hospitality
              </span>
              <span className="text-sm">🥢</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}