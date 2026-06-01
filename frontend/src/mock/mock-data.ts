import type { MenuItemResponse, User, OrderResponse, PaymentResponse } from "@/types/api";
import soupsImg from "@/assets/soups.jpg";
import noodlesImg from "@/assets/noodles.jpg";
import dumplingsImg from "@/assets/dumplings.jpg";

export const DEMO_USERS: User[] = [
  {
    id: "user-admin-1",
    name: "Admin",
    fullName: "Admin User",
    email: "admin@gmail.com",
    password: "123456",
    username: "admin",
    role: "ADMIN",
    active: true,
  },
  {
    id: "user-staff-1",
    name: "Staff",
    fullName: "Floor Staff",
    email: "staff@asianway.local",
    username: "staff",
    role: "STAFF",
    active: true,
  },
  {
    id: "user-kitchen-1",
    name: "Kitchen",
    fullName: "Kitchen Crew",
    email: "kitchen@asianway.local",
    username: "kitchen",
    role: "KITCHEN",
    active: true,
  },
];

export const MOCK_MENU_CATEGORIES = [
  {
    id: "soups",
    label: "Soups",
    description: "Rich broth bowls with premium toppings.",
    imageUrl: soupsImg,
  },
  {
    id: "noodles",
    label: "Noodles",
    description: "Handcrafted noodle dishes served piping hot.",
    imageUrl: noodlesImg,
  },
  {
    id: "dumplings",
    label: "Dumplings",
    description: "Soft dumplings with savory fillings.",
    imageUrl: dumplingsImg,
  },
] as const;

export const MOCK_MENU_ITEMS: MenuItemResponse[] = [
  {
    id: "item-01",
    name: "Tonkotsu Ramen",
    description: "Slow-simmered pork broth, chashu, soft egg.",
    price: 14,
    categoryId: "soups",
    imageUrl: soupsImg,
  },
  {
    id: "item-02",
    name: "Spicy Miso Ramen",
    description: "Roasted miso, chili oil, pork belly, corn.",
    price: 13,
    categoryId: "soups",
    imageUrl: soupsImg,
  },
  {
    id: "item-03",
    name: "Pho Bo",
    description: "Aromatic beef broth, brisket, Thai basil.",
    price: 15,
    categoryId: "soups",
    imageUrl: soupsImg,
  },
  {
    id: "item-04",
    name: "Wok Lo Mein",
    description: "Egg noodles, mixed vegetables, savory soy.",
    price: 12,
    categoryId: "noodles",
    imageUrl: noodlesImg,
  },
  {
    id: "item-05",
    name: "Dan Dan Noodles",
    description: "Sesame chili sauce, minced pork, scallions.",
    price: 13,
    categoryId: "noodles",
    imageUrl: noodlesImg,
  },
  {
    id: "item-06",
    name: "Pork Xiao Long Bao",
    description: "Soup-filled dumplings, ginger vinegar.",
    price: 10,
    categoryId: "dumplings",
    imageUrl: dumplingsImg,
  },
  {
    id: "item-07",
    name: "Chicken Potstickers",
    description: "Pan-seared, scallion, soy-vinegar.",
    price: 9,
    categoryId: "dumplings",
    imageUrl: dumplingsImg,
  },
];

export const MOCK_TABLES = [
  { id: "T1", status: "AVAILABLE", guests: 0, seats: 4 },
  { id: "T2", status: "OCCUPIED", guests: 3, seats: 4 },
  { id: "T3", status: "RESERVED", guests: 0, seats: 2 },
  { id: "T4", status: "AVAILABLE", guests: 0, seats: 6 },
  { id: "T5", status: "OCCUPIED", guests: 5, seats: 6 },
];

export const MOCK_ORDERS: OrderResponse[] = [
  {
    id: "ORD-101",
    sessionId: "S-101",
    tableId: "T2",
    items: [
      { id: "oi-1", itemId: "item-01", itemName: "Tonkotsu Ramen", quantity: 1, price: 14, status: "PREPARING" },
      { id: "oi-2", itemId: "item-06", itemName: "Pork Xiao Long Bao", quantity: 2, price: 10, status: "PREPARING" },
    ],
    subtotal: 34,
    tax: 2.72,
    serviceCharge: 3.4,
    discount: 0,
    total: 40.12,
    status: "PREPARING",
    paymentMethod: "CASH",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "ORD-102",
    sessionId: "S-102",
    tableId: "T5",
    items: [
      { id: "oi-3", itemId: "item-04", itemName: "Wok Lo Mein", quantity: 2, price: 12, status: "READY" },
    ],
    subtotal: 24,
    tax: 1.92,
    serviceCharge: 2.4,
    discount: 0,
    total: 28.32,
    status: "READY",
    paymentMethod: "CARD",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
];

export const MOCK_PAYMENTS: PaymentResponse[] = [
  { id: "PAY-501", orderId: "ORD-098", method: "CARD", amount: 55.5, status: "COMPLETED", reference: "REF123" },
  { id: "PAY-502", orderId: "ORD-101", method: "CASH", amount: 40.12, status: "PENDING", reference: "" },
  { id: "PAY-503", orderId: "ORD-102", method: "CARD", amount: 28.32, status: "COMPLETED", reference: "REF456" },
];

export const MOCK_CATEGORIES = [
  { id: "cat-1", name: "Ramen", items: 8 },
  { id: "cat-2", name: "Dumplings", items: 5 },
  { id: "cat-3", name: "Drinks", items: 4 },
  { id: "cat-4", name: "Sides", items: 6 },
];
