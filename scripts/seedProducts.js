// seed/seedProducts.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();  

const products = [
  { title: "Charcoal Face Mask", description: "Detoxifies and clears your skin.", price: 321, oldPrice: 354, discount: '10% off', imagePath: "./images/charcoalface.png", contentType: 'image/png', category: 'Skin Care', inStock: true, rating: 5 },
  { title: "Face Serum", description: "Brightens and smoothens the skin.", price: 420, oldPrice: 499, discount: '16% off', imagePath: "./images/faceserum.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 5 },
  { title: "Cold Oil Hair Treatment", description: "Nourishes dry scalp with natural oils.", price: 418, oldPrice: 460, discount: '9% off', imagePath: "./images/coldoilhair.webp", contentType: 'image/webp', category: 'Hair Care', inStock: true, rating: 4 },
  { title: "Concealer Stick", description: "Covers blemishes and dark circles flawlessly.", price: 225, oldPrice: 250, discount: '10% off', imagePath: "./images/concealer.webp", contentType: 'image/webp', category: 'Makeup', inStock: true, rating: 4 },
  { title: "Cooling Sunscreen", description: "Protects against UVA/UVB with a refreshing feel.", price: 319, oldPrice: 350, discount: '9% off', imagePath: "./images/coolingsunscreen.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 4 },
  { title: "Detan Face Mask", description: "Removes tan and evens skin tone.", price: 255, oldPrice: 280, discount: '9% off', imagePath: "./images/detanfacemask.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 5 },
  { title: "Eye Cream", description: "Reduces puffiness and dark circles.", price: 238, oldPrice: 260, discount: '8% off', imagePath: "./images/eyecream.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 3 },
  { title: "Eyeliner", description: "Long-lasting smudge-proof eyeliner.", price: 152, oldPrice: 170, discount: '10% off', imagePath: "./images/eyeliner.webp", contentType: 'image/webp', category: 'Makeup', inStock: true, rating: 5 },
  { title: "Face Mask", description: "Hydrating and purifying face mask.", price: 130, oldPrice: 145, discount: '10% off', imagePath: "./images/facemask.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 4 },
  { title: "Vitamin C Face Serum", description: "Fights dullness with potent Vitamin C.", price: 242, oldPrice: 270, discount: '10% off', imagePath: "./images/faceserum2.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 5 },
  { title: "Fairness Lotion", description: "Lightens and nourishes skin daily.", price: 315, oldPrice: 340, discount: '7% off', imagePath: "./images/fairnesslotion.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 4 },
  { title: "Hair Care Kit", description: "Complete care for shiny, healthy hair.", price: 604, oldPrice: 660, discount: '8% off', imagePath: "./images/haircare.jpg", contentType: 'image/jpeg', category: 'Hair Care', inStock: true, rating: 4 },
  { title: "Hair Conditioner", description: "Smoothens and nourishes hair.", price: 202, oldPrice: 220, discount: '8% off', imagePath: "./images/hairconditioner.webp", contentType: 'image/webp', category: 'Hair Care', inStock: true, rating: 4 },
  { title: "Hair Fall Shampoo", description: "Reduces hair fall and strengthens roots.", price: 232, oldPrice: 250, discount: '7% off', imagePath: "./images/hairfallshampoo.webp", contentType: 'image/webp', category: 'Hair Care', inStock: true, rating: 4 },
  { title: "Hair Growth Spray", description: "Stimulates hair growth naturally.", price: 235, oldPrice: 260, discount: '10% off', imagePath: "./images/hairgrowthspray.webp", contentType: 'image/webp', category: 'Hair Care', inStock: true, rating: 5 },
  { title: "Hair Oil", description: "Enriched with natural extracts for hair repair.", price: 160, oldPrice: 180, discount: '11% off', imagePath: "./images/hairoil.webp", contentType: 'image/webp', category: 'Hair Care', inStock: true, rating: 4 },
  { title: "Highlighter", description: "Adds a radiant glow to your makeup.", price: 128, oldPrice: 145, discount: '12% off', imagePath: "./images/highlighter.webp", contentType: 'image/webp', category: 'Makeup', inStock: true, rating: 4 },
  { title: "Lipstick", description: "Bold colors with a smooth finish.", price: 140, oldPrice: 160, discount: '13% off', imagePath: "./images/lipstick.webp", contentType: 'image/webp', category: 'Makeup', inStock: true, rating: 5 },
  { title: "Makeup Kit", description: "All-in-one kit for daily makeup needs.", price: 175, oldPrice: 200, discount: '12% off', imagePath: "./images/makeup.jpg", contentType: 'image/jpeg', category: 'Makeup', inStock: true, rating: 5 },
  { title: "Mascara", description: "Volumizes and lifts lashes.", price: 513, oldPrice: 550, discount: '7% off', imagePath: "./images/mascara.webp", contentType: 'image/webp', category: 'Makeup', inStock: true, rating: 4 },
  { title: "Moisturizer", description: "Keeps skin soft and hydrated.", price: 120, oldPrice: 135, discount: '11% off', imagePath: "./images/moisturizer.webp", contentType: 'image/webp', category: 'Skin Care', inStock: true, rating: 4 },
  { title: "Perfume", description: "Long-lasting floral fragrance.", price: 95, oldPrice: 110, discount: '14% off', imagePath: "./images/perfume.jpg", contentType: 'image/jpeg', category: 'Perfume', inStock: true, rating: 5 },
  { title: "Perfume 1", description: "Elegant scent for special occasions.", price: 248, oldPrice: 275, discount: '10% off', imagePath: "./images/perfume1.webp", contentType: 'image/webp', category: 'Perfume', inStock: true, rating: 5 },
  { title: "Perfume 2", description: "Elegant scent for special occasions.", price: 148, oldPrice: 165, discount: '10% off', imagePath: "./images/perfume2.webp", contentType: 'image/webp', category: 'Perfume', inStock: true, rating: 5 },
  { title: "Perfume 3", description: "Elegant scent for special occasions.", price: 248, oldPrice: 270, discount: '8% off', imagePath: "./images/perfume3.webp", contentType: 'image/webp', category: 'Perfume', inStock: true, rating: 5 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));
    await Product.deleteMany();

    const formattedProducts = products.map((product) => {
      const imagePath = path.resolve(__dirname, product.imagePath);
      const imageData = fs.readFileSync(imagePath);
      return {
        title: product.title,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
        image: {
          data: imageData,
          contentType: product.contentType
        },
        category: product.category,
        inStock: product.inStock,
        rating: product.rating
      };
    });

    await Product.insertMany(formattedProducts);
    console.log('✅ Products seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding products:', err);
  }
}

seed();