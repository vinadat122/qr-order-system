import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import aboutImg from "@/assets/about.jpg";

import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { Sprout, Flame, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Noodle Way" },
      { name: "description", content: "Our story, our chefs, our craft. Authentic Asian cooking, served with heart." },
      { property: "og:title", content: "About — The Noodle Way" },
      { property: "og:description", content: "Hand-pulled noodles. Slow broths. Real flavors from the east." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="Hand-pulled noodles, slow broths, real flavors from the east."
        image={aboutImg}
      />

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 space-y-8 text-lg/relaxed text-muted-foreground">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              A bowl is a love letter.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              The Noodle Way started with a single recipe — a broth our grandmother
              simmered for twelve hours, every Sunday, for a family that always
              showed up hungry. Today, every bowl we serve carries that same
              patience.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              We pull our noodles by hand. We hand-fold every dumpling. We source
              chilies, soy, and herbs from growers who care as much as we do.
              Nothing is shortcut, nothing is pre-packaged.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-soft py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">What we believe</h2>
          </Reveal>
          <Stagger className="grid gap-10 md:grid-cols-3">
            {[
              { icon: Sprout, title: "Fresh", desc: "Daily-sourced produce, dough made every morning." },
              { icon: Flame, title: "Authentic", desc: "Recipes passed down, not reinvented." },
              { icon: Heart, title: "With Care", desc: "Every dish prepared by hand, by people who love this food." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="bg-background rounded-3xl p-10 text-center shadow-sm"
              >
                <div className="mx-auto mb-6 grid place-items-center h-16 w-16 rounded-full bg-brand text-brand-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-background py-24">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Come hungry.</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Reserve a table or order online — your bowl is waiting.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="inline-flex items-center justify-center rounded-full bg-brand text-brand-foreground px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:opacity-90 transition">
              View Menu
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-brand text-brand px-8 py-3.5 text-sm font-medium tracking-wider uppercase hover:bg-brand-soft transition">
              Reserve a Table
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function PageHero({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-5xl md:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-xl text-lg opacity-90"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}

