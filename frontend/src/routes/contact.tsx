import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { 
  MapPin, Phone, Mail, Clock, 
  Users, Calendar, Timer, MessageSquare, 
  CalendarCheck, ArrowRight 
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useCart } from "@/store/cart.store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Reservations & Contact — The Asian Way" },
      { name: "description", content: "Book your table and experience premium Asian cuisine in Hanoi." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-zinc-900">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={heroImg}
          alt="Restaurant Interior"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand font-black tracking-[0.4em] uppercase text-xs mb-4"
          >
            Haidilao Standard Service
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans font-black text-6xl md:text-8xl uppercase tracking-tighter"
          >
            CONTACT US
          </motion.h1>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-16 lg:grid-cols-2 items-start">
          <div className="space-y-8">
            <Reveal>
              <div className="inline-block px-4 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-widest mb-4">
                Step 1: Secure your seat
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight">Book Your Table</h2>
              <p className="text-muted-foreground max-w-md font-medium">
                Vui lòng điền thông tin để giữ chỗ. Sau khi hoàn tất, bạn có thể chọn món online để tiết kiệm thời gian chờ đợi.
              </p>
            </Reveal>
            <ReserveForm />
          </div>

          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: MapPin, title: "Address", text: "123 Pho Den Long\nHoan Kiem, Hanoi" },
                { icon: Phone, title: "Hotline", text: "1900 1234\n+84 24 1234 5678" },
                { icon: Clock, title: "Opening Hours", text: "Daily: 09:00 AM\nClose: 02:00 AM" },
                { icon: Mail, title: "Support", text: "service@theasianway.vn" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-black uppercase text-sm tracking-widest">{title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line font-medium pl-14">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="rounded-[2.5rem] overflow-hidden border-4 border-muted aspect-video shadow-2xl relative group">
                <iframe
                  title="Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=105.842%2C21.025%2C105.858%2C21.035&layer=mapnik&marker=21.0285%2C105.8521"
                  className="h-full w-full grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function ReserveForm() {
  const [submitted, setSubmitted] = useState(false);
  const { cart, placeOrder } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("1-2 Guests");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-900 text-white p-10 md:p-14 rounded-[2.5rem] text-center space-y-8 border border-white/5 shadow-2xl"
      >
        <div className="space-y-4">
          <div className="h-20 w-20 bg-brand rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-brand/40">
            <CalendarCheck className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter text-white">
            Reservation Done!
          </h3>
          <p className="text-white text-sm leading-relaxed max-w-xs mx-auto font-medium">
            Bàn của bạn đã được giữ. Để được phục vụ món ngay khi vừa đến, hãy chọn món trực tuyến ngay bây giờ!
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm text-muted-foreground">
            {cart.length > 0 ? (
              <p>{cart.length} món đã được chuyển thành đơn đặt hàng.</p>
            ) : (
              <p>Bạn chưa chọn món nào. Bạn có thể quay lại Menu để đặt món.</p>
            )}
          </div>
          <Link
            to="/menu"
            className="w-full bg-brand py-5 rounded-2xl shadow-lg shadow-brand/20 active:scale-[0.98] transition-all flex items-center justify-center group"
          >
            <span className="text-white font-black uppercase tracking-[0.15em] text-sm flex items-center gap-2">
              Order Online Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-4 border-2 border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white"
          >
            Back to information
          </button>
        </div>
      </motion.div>
    );
  }
  const handleSubmit = () => {
    setError(null);
    if (!name.trim()) return setError("Vui lòng nhập họ tên.");
    if (!phone.trim()) return setError("Vui lòng nhập số điện thoại.");
    if (!date) return setError("Vui lòng chọn ngày.");
    // Place order (may return null if cart empty)
    try {
      const o = placeOrder({ name, phone, guests, date, time, notes });
      console.log("ReserveForm.placeOrder returned", o);
    } catch (e) {
      console.error(e);
    }
    setSubmitted(true);
  };

  return (
    <form className="bg-card border border-border p-8 md:p-10 rounded-[2.5rem] shadow-xl space-y-6" onSubmit={(e)=>e.preventDefault()}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
            <Users className="h-3 w-3" /> Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder="Nguyen Van A"
            className="w-full bg-muted border-2 border-transparent focus:border-brand rounded-2xl px-5 py-4 outline-none font-bold transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
            <Phone className="h-3 w-3" /> Phone Number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            required
            placeholder="09xx xxx xxx"
            className="w-full bg-muted border-2 border-transparent focus:border-brand rounded-2xl px-5 py-4 outline-none font-bold transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">Guests</label>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full bg-muted border-2 border-transparent focus:border-brand rounded-2xl px-5 py-4 outline-none font-bold transition-all appearance-none">
            <option>1-2 Guests</option>
            <option>3-5 Guests</option>
            <option>6-10 Guests</option>
            <option>Party (10+)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
            <Calendar className="h-3 w-3" /> Date
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            required
            className="w-full bg-muted border-2 border-transparent focus:border-brand rounded-2xl px-5 py-4 outline-none font-bold transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
            <Timer className="h-3 w-3" /> Time
          </label>
          <select value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-muted border-2 border-transparent focus:border-brand rounded-2xl px-5 py-4 outline-none font-bold transition-all appearance-none">
            <option>11:30 AM</option>
            <option>18:00 PM</option>
            <option>19:30 PM</option>
            <option>21:00 PM</option>
            <option>Late Night</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-1 opacity-60">
          <MessageSquare className="h-3 w-3" /> Special Requests (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Yêu cầu về bàn, sinh nhật, dị ứng..."
          className="w-full bg-muted border-2 border-transparent focus:border-brand rounded-2xl px-5 py-4 outline-none font-bold transition-all min-h-[100px] resize-none"
        />
      </div>

      {error && <div className="text-sm text-red-400">{error}</div>}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-brand py-5 rounded-2xl shadow-xl shadow-brand/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center"
      >
        <span className="text-zinc-950 font-black uppercase tracking-[0.2em] text-sm">Confirm Reservation</span>
      </button>
    </form>
  );
}