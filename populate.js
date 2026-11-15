import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Product } from "./models/Product.js";
import { Order } from "./models/Order.js";
import { Category } from "./models/Category.js";
import { Review } from "./models/Review.js";
import dotenv from "dotenv";

dotenv.config();

const populateDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB...");

    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({}),
      Review.deleteMany({}),
    ]);
    console.log("Old data cleared.");

    const users = await User.create([
      {
        first_name: "Олександр",
        last_name: "Петренко",
        email: "oleksandr.petrenko@example.com",
        password: "hashedpassword123",
      },
      {
        first_name: "Марія",
        last_name: "Ковальчук",
        email: "mariia.kovalchuk@example.com",
        password: "hashedpassword456",
      },
      {
        first_name: "Андрій",
        last_name: "Мельник",
        email: "andrii.melnyk@example.com",
        password: "hashedpassword789",
      },
      {
        first_name: "Ірина",
        last_name: "Шевченко",
        email: "iryna.shevchenko@example.com",
        password: "hashedpassword321",
      },
      {
        first_name: "Дмитро",
        last_name: "Бойко",
        email: "dmytro.boyko@example.com",
        password: "hashedpassword654",
      },
    ]);
    console.log(`Created ${users.length} users.`);

    const categories = await Category.create([
      {
        name: "Смартфони",
        description: "Мобільні телефони та смартфони",
        slug: "smartphones",
      },
      {
        name: "Ноутбуки",
        description: "Портативні комп'ютери та ультрабуки",
        slug: "laptops",
      },
      {
        name: "Планшети",
        description: "Планшетні комп'ютери для роботи й розваг",
        slug: "tablets",
      },
      {
        name: "Навушники",
        description: "Бездротові тапровідні навушники й гарнітури",
        slug: "headphones",
      },
      {
        name: "Смарт-години",
        description: "Розумні годинники та фітнес-браслети",
        slug: "smartwatches",
      },
    ]);
    console.log(`Created ${categories.length} categories.`);

    const products = await Product.create([
      {
        title: "iPhone 15 Pro",
        price: 45000,
        stock: 10,
        categoryId: categories[0]._id,
        specs: { ram: "8GB", storage: "256GB", cpu: "A17 Pro" },
      },
      {
        title: "MacBook Pro 14 M3",
        price: 85000,
        stock: 5,
        categoryId: categories[1]._id, 
        specs: { ram: "16GB", storage: "512GB", cpu: "Apple M3" },
      },
      {
        title: "iPad Air",
        price: 30000,
        stock: 7,
        categoryId: categories[2]._id, 
        specs: { ram: "8GB", storage: "128GB", cpu: "M1" },
      },
      {
        title: "Sony WH-1000XM5",
        price: 14000,
        stock: 15,
        categoryId: categories[3]._id, 
        specs: { ram: "-", storage: "-", cpu: "-" },
      },
      {
        title: "Apple Watch Series 9",
        price: 18000,
        stock: 12,
        categoryId: categories[4]._id, 
        specs: { ram: "1GB", storage: "64GB", cpu: "S9 SiP" },
      },
    ]);
    console.log(`Created ${products.length} products.`);

    const orders = await Order.create([
      {
        userId: users[0]._id,
        items: [{ productId: products[0]._id, quantity: 1 }],
        totalAmount: 45000,
        status: "Processing",
      },
      {
        userId: users[1]._id,
        items: [{ productId: products[1]._id, quantity: 1 }],
        totalAmount: 85000,
        status: "Delivered",
      },
      {
        userId: users[2]._id,
        items: [{ productId: products[2]._id, quantity: 2 }],
        totalAmount: 60000,
        status: "Pending",
      },
      {
        userId: users[3]._id,
        items: [{ productId: products[3]._id, quantity: 1 }],
        totalAmount: 14000,
        status: "Delivered",
      },
      {
        userId: users[4]._id,
        items: [{ productId: products[4]._id, quantity: 1 }],
        totalAmount: 18000,
        status: "Processing",
      },
    ]);
    console.log(`Created ${orders.length} orders.`);

    const reviews = await Review.create([
      {
        userId: users[0]._id,
        productId: products[0]._id,
        rating: 5,
        comment: "Чудовий телефон, камера просто неперевершена!",
      },
      {
        userId: users[1]._id,
        productId: products[1]._id,
        rating: 5,
        comment: "Дуже потужний ноутбук для роботи з кодом.",
      },
      {
        userId: users[2]._id,
        productId: products[2]._id,
        rating: 4,
        comment: "Хороший планшет, але ціна трохи завищена.",
      },
      {
        userId: users[3]._id,
        productId: products[3]._id,
        rating: 5,
        comment: "Найкраще шумозаглушення на ринку.",
      },
      {
        userId: users[4]._id,
        productId: products[4]._id,
        rating: 4,
        comment: "Зручний годинник на кожен день.",
      },
    ]);
    console.log(`Created ${reviews.length} reviews.`);

    console.log(
      "\n--- Перевірка зв'язку (Populate) для першого замовлення ---",
    );
    const populatedOrder = await Order.findById(orders[0]._id)
      .populate("userId", "first_name last_name email")
      .populate("items.productId", "title price");

    console.log(JSON.stringify(populatedOrder, null, 2));

    console.log("\nDatabase successfully populated!");
    process.exit(0);
  } catch (err) {
    console.error("Error populating database:", err.message);
    process.exit(1);
  }
};

populateDB();
