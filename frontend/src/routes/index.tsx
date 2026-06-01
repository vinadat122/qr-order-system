import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ChevronDown, Instagram } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import soupsImg from "@/assets/soups.jpg";
import noodlesImg from "@/assets/noodles.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";
import aboutImg from "@/assets/about.jpg";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Noodle Way — Authentic Asian Food" },
      {
        name: "description",
        content:
          "The Noodle Way serves authentic Asian food — fresh soups, noodles and dumplings. Order online or reserve a table.",
      },
      { property: "og:title", content: "The Noodle Way — Authentic Asian Food" },
      { property: "og:description", content: "Fresh. Authentic. Simple." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Dishes />
      <AboutBand />
      <Instagrid />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[calc(100vh-7rem)] min-h-[640px] w-full overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Bowls of authentic Asian noodles on a red background"
        width={1920}
        height={1080}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl"
        >
          The Real Deal
          <br />
          on Asian Food
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl/relaxed max-w-xl"
        >
          The Noodle Way serves authentic Asian food
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <Link
            to="/menu"
            className="mt-10 inline-flex items-center justify-center rounded-full border-2 border-white px-12 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-white hover:text-brand transition"
          >
            Menu
          </Link>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12"
        >
          <ChevronDown className="h-8 w-8 opacity-80" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Dishes() {
  const items = [
    { title: "Soups", desc: "Bowls of endless flavors from the east", img: soupsImg },
    { title: "Noodles", desc: "The way noodles were meant to be", img: noodlesImg },
    { title: "Dumplings", desc: "It’s all about the filling. And the dough.", img: dumplingsImg },
  ];
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Stagger className="grid gap-14 md:grid-cols-3">
          {items.map((it) => (
            <motion.article
              key={it.title}
              variants={itemVariants}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-full aspect-square mx-auto max-w-sm">
                <motion.img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-8 text-3xl md:text-4xl font-bold">{it.title}</h2>
              <p className="mt-3 text-muted-foreground max-w-xs mx-auto">{it.desc}</p>
            </motion.article>
          ))}
        </Stagger>
        <Reveal className="mt-16 flex justify-center" delay={0.2}>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-full bg-brand text-brand-foreground px-10 py-4 text-sm font-medium tracking-wider uppercase hover:opacity-90 transition hover:scale-105 duration-300"
          >
            Order Now
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function AboutBand() {
  return (
    <section className="bg-brand text-brand-foreground py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid gap-16 md:grid-cols-2 items-center">
        <Reveal>
          <motion.img
            src={aboutImg}
            alt="Chef preparing fresh noodles"
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl w-full object-cover aspect-[4/5] shadow-2xl"
          />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-display font-black text-5xl md:text-6xl leading-[0.95]">
              Fresh.
              <br />
              Authentic.
              <br />
              Simple.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg/relaxed opacity-90">
              We’re bringing flavors from the east — to your plate.
            </p>
            <p className="mt-5 text-base/relaxed opacity-80 max-w-xl">
              From hand-pulled noodles to slow-simmered broths, every dish is
              crafted by chefs who grew up cooking these recipes.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center justify-center rounded-full border-2 border-brand-foreground px-10 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-brand-foreground hover:text-brand transition"
            >
              About Us
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Instagrid() {
  const imgs = [soupsImg, noodlesImg, dumplingsImg, heroImg];
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-12">
          <h3 className="font-display text-3xl md:text-4xl font-bold">Follow</h3>
          <p className="text-muted-foreground mt-2">@thenoodleway</p>
        </Reveal>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-3" stagger={0.08}>
          {imgs.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="relative block aspect-square overflow-hidden rounded-2xl group"
            >
              <img
                src={src}
                alt={`Instagram post ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/40 transition grid place-items-center">
                <Instagram className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition" />
              </div>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
