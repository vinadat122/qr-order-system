import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus, ShoppingBag, X, Check } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Reveal, Stagger, itemVariants } from "@/components/site/Reveal";
import { useCart } from "@/store/cart.store";
import { useEffect } from "react";

import { getFoods } from "@/services/food.service";
import type { MenuItemResponse } from "@/types/api";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — The Asian Way" },
      { name: "description", content: "Order online and experience premium Asian cuisine." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [foods, setFoods] = useState<MenuItemResponse[]>([]);
  const { cart, addItem, clearCart, totalPrice } = useCart();
  useEffect(() => {
    fetchFoods();
  }, []);
  const fetchFoods = async () => {
    try {
      const data = await getFoods();
      setFoods(data);
    } catch (error) {
      console.log(error);
    }
  };
  const addToCart = (dish: MenuItemResponse) => {
    addItem(dish);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {" "}
      {/* HERO SECTION */}{" "}
      <section className="relative h-[40vh] overflow-hidden bg-zinc-900">
        {" "}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          src={heroImg}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />{" "}
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          {" "}
          <h1 className="font-black text-6xl md:text-8xl uppercase tracking-tighter italic">
            {" "}
            THE MENU{" "}
          </h1>{" "}
        </div>{" "}
      </section>{" "}
      {/* DISHES LIST */}{" "}
      <section className="py-16">
        {" "}
        <div className="mx-auto max-w-7xl px-6">
          {" "}
          <div className="space-y-4">
            {" "}
            {foods.map((food) => (
              <motion.div
                key={food.id}
            
                onClick={() => addToCart(food)}
                className="group relative bg-card border border-border p-6 rounded-[2rem] cursor-pointer hover:border-brand transition-all active:scale-[0.98]"
              >
                {" "}
                <div className="flex justify-between items-start">
                  {" "}
                  <div className="space-y-1">
                    {" "}
                    <h3 className="font-black uppercase text-xl tracking-tight group-hover:text-brand transition-colors">
                      {" "}
                      {food.name}{" "}
                    </h3>{" "}
                    <p className="text-muted-foreground text-sm max-w-[250px]">
                      {" "}
                      {food.description}{" "}
                    </p>{" "}
                  </div>{" "}
                  <div className="flex flex-col items-end gap-3">
                    {" "}
                    <span className="font-black text-xl text-brand"> ${food.price} </span>{" "}
                    <div className="bg-muted group-hover:bg-brand group-hover:text-white p-2 rounded-xl transition-all">
                      {" "}
                      <Plus className="h-5 w-5" />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </motion.div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* FLOATING CART SUMMARY */}{" "}
      <AnimatePresence>
        {" "}
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
          >
            {" "}
            <div className="bg-zinc-950 text-white rounded-3xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
              {" "}
              <div className="flex items-center justify-between mb-4">
                {" "}
                <div className="flex items-center gap-3">
                  {" "}
                  <div className="bg-brand p-2 rounded-lg text-zinc-950">
                    {" "}
                    <ShoppingBag className="h-5 w-5" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
                      {" "}
                      Your Order{" "}
                    </p>{" "}
                    <p className="font-bold"> {cart.length} items selected </p>{" "}
                  </div>{" "}
                </div>{" "}
                <button onClick={() => clearCart()} className="text-white/40 hover:text-white">
                  {" "}
                  <X className="h-5 w-5" />{" "}
                </button>{" "}
              </div>{" "}
              <div className="flex gap-4 items-center">
                {" "}
                <div className="flex-1">
                  {" "}
                  <p className="text-[10px] font-black uppercase opacity-50"> Total Amount </p>{" "}
                  <p className="text-2xl font-black text-brand"> ${totalPrice} </p>{" "}
                </div>{" "}
                <Link
                  to="/cart"
                  className="bg-white text-zinc-950 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand transition-all flex items-center gap-2"
                >
                  {" "}
                  Confirm Order <Check className="h-4 w-4" />{" "}
                </Link>{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
}
