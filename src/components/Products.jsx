import charcoalface from './../assets/charcoalface.png';
import coldoilhair from './../assets/coldoilhair.webp';
import concealer from './../assets/concealer.webp';
import coolingsunscreen from './../assets/coolingsunscreen.webp';
import detanfacemask from './../assets/detanfacemask.webp';
import eyecream from './../assets/eyecream.webp';
import eyeliner from './../assets/eyeliner.webp';
import facemask from './../assets/facemask.webp';
import faceserum from './../assets/faceserum.webp';
import faceserum2 from './../assets/faceserum2.webp';
import fairnesslotion from './../assets/fairnesslotion.webp';
import haircare from './../assets/haircare.jpg';
import hairconditioner from './../assets/hairconditioner.webp';
import hairfallshampoo from './../assets/hairfallshampoo.webp';
import hairgrowthspray from './../assets/hairgrowthspray.webp';
import hairoil from './../assets/hairoil.webp';
import highlighter from './../assets/highlighter.webp';
import lipstick from './../assets/lipstick.webp';
import makeup from './../assets/makeup.jpg';
import mascara from './../assets/mascara.webp';
import moisturizer from './../assets/moisturizer.webp';
import perfume from './../assets/perfume.jpg';
import perfume1 from './../assets/perfume1.webp';
import primer from './../assets/primer.jpg';
import perfume2 from './../assets/perfume2.webp';
import perfume3 from './../assets/perfume3.webp';
export const products = [
  { id: 1, name: "Lilac BB Cream", price: "$354.00", image: primer, rating: 4, description: "A hydrating BB cream for a flawless look.", inStock: true, category: 'Skin Care' },
  { id: 2, name: "Charcoal Face Mask", price: "$321.00", image: charcoalface, rating: 5, description: "Detoxifies and clears your skin.", inStock: true, category: 'Skin Care' },
  { id: 3, name: "Cold Oil Hair Treatment", price: "$418.00", image: coldoilhair, rating: 4, description: "Nourishes dry scalp with natural oils.", inStock: true, category: 'Hair Care' },
  { id: 4, name: "Concealer Stick", price: "$225.00", image: concealer, rating: 4, description: "Covers blemishes and dark circles flawlessly.", inStock: true, category: 'Makeup' },
  { id: 5, name: "Cooling Sunscreen", price: "$319.00", image: coolingsunscreen, rating: 4, description: "Protects against UVA/UVB with a refreshing feel.", inStock: true, category: 'Skin Care' },
  { id: 6, name: "Detan Face Mask", price: "$255.00", image: detanfacemask, rating: 5, description: "Removes tan and evens skin tone.", inStock: true, category: 'Skin Care' },
  { id: 7, name: "Eye Cream", price: "$238.00", image: eyecream, rating: 3, description: "Reduces puffiness and dark circles.", inStock: true, category: 'Skin Care' },
  { id: 8, name: "Eyeliner", price: "$152.00", image: eyeliner, rating: 5, description: "Long-lasting smudge-proof eyeliner.", inStock: true, category: 'Makeup' },
  { id: 9, name: "Face Mask", price: "$130.00", image: facemask, rating: 4, description: "Hydrating and purifying face mask.", inStock: true, category: 'Skin Care' },
  { id: 10, name: "Face Serum", price: "$420.00", image: faceserum, rating: 5, description: "Brightens and smoothens the skin.", inStock: true, category: 'Skin Care' },
  { id: 11, name: "Vitamin C Face Serum", price: "$242.00", image: faceserum2, rating: 5, description: "Fights dullness with potent Vitamin C.", inStock: true, category: 'Skin Care' },
  { id: 12, name: "Fairness Lotion", price: "$315.00", image: fairnesslotion, rating: 4, description: "Lightens and nourishes skin daily.", inStock: true, category: 'Skin Care' },
  { id: 13, name: "Hair Care Kit", price: "$604.00", image: haircare, rating: 4, description: "Complete care for shiny, healthy hair.", inStock: true, category: 'Hair Care' },
  { id: 14, name: "Hair Conditioner", price: "$202.00", image: hairconditioner, rating: 4, description: "Smoothens and nourishes hair.", inStock: true, category: 'Hair Care' },
  { id: 15, name: "Hair Fall Shampoo", price: "$232.00", image: hairfallshampoo, rating: 4, description: "Reduces hair fall and strengthens roots.", inStock: true, category: 'Hair Care' },
  { id: 16, name: "Hair Growth Spray", price: "$235.00", image: hairgrowthspray, rating: 5, description: "Stimulates hair growth naturally.", inStock: true, category: 'Hair Care' },
  { id: 17, name: "Hair Oil", price: "$160.00", image: hairoil, rating: 4, description: "Enriched with natural extracts for hair repair.", inStock: true, category: 'Hair Care' },
  { id: 18, name: "Highlighter", price: "$128.00", image: highlighter, rating: 4, description: "Adds a radiant glow to your makeup.", inStock: true, category: 'Makeup' },
  { id: 19, name: "Lipstick", price: "$140.00", image: lipstick, rating: 5, description: "Bold colors with a smooth finish.", inStock: true, category: 'Makeup' },
  { id: 20, name: "Makeup Kit", price: "$175.00", image: makeup, rating: 5, description: "All-in-one kit for daily makeup needs.", inStock: true, category: 'Makeup' },
  { id: 21, name: "Mascara", price: "$513.00", image: mascara, rating: 4, description: "Volumizes and lifts lashes.", inStock: true, category: 'Makeup' },
  { id: 22, name: "Moisturizer", price: "$120.00", image: moisturizer, rating: 4, description: "Keeps skin soft and hydrated.", inStock: true, category: 'Skin Care' },
  { id: 23, name: "Perfume", price: "$95.00", image: perfume, rating: 5, description: "Long-lasting floral fragrance.", inStock: true, category: 'Perfume' },
  { id: 24, name: "Perfume 1", price: "$248.00", image: perfume1, rating: 5, description: "Elegant scent for special occasions.", inStock: true, category: 'Perfume' },
  { id: 24, name: "Perfume 1", price: "$148.00", image: perfume2, rating: 5, description: "Elegant scent for special occasions.", inStock: true, category: 'Perfume' },
  { id: 24, name: "Perfume 1", price: "$248.00", image: perfume3, rating: 5, description: "Elegant scent for special occasions.", inStock: true, category: 'Perfume' }
];



/*products.js
import primer from './../assets/primer.jpg';
import fairness from'./../assets/fairnesslotion.webp'
export const products = [
  {
    id: 1,
    name: "Lilac BB Cream",
    price: "$54.00",
    image: primer,
    rating: 4,
    description: "A hydrating BB cream for a flawless look.",
    inStock: true,
    category: 'Skin Care'
  },
  {
    id: 2,
    name: "Fairness Lotion",
    price: "$36.00",
    oldPrice: "$60.00",
    discount: "40%",
    image: fairness,
    rating: 5,
    description: "A fairness lotion with SPF protection.",
    inStock: true,
  },
  {
    id: 3,
    name: "Under Eye Cream",
    price: "$25.00",
    image: "https://via.placeholder.com/300x200",
    rating: 4,
    description: "Reduces puffiness and dark circles.",
    inStock: true,
  },
  {
    id: 4,
    name: "Nourishing Facial Cream",
    price: "$32.00",
    oldPrice: "$40.00",
    discount: "20%",
    image: "https://via.placeholder.com/300x200",
    rating: 5,
    description: "A nourishing facial cream for dry skin.",
    inStock: false,
  },
  {
    id: 5,
    name: "Radiance Day Cream",
    price: "$32.00",
    image: "https://via.placeholder.com/300x200",
    rating: 4,
    description: "Brightens your skin and gives a radiant glow.",
    inStock: true,
  },
  {
    id: 6,
    name: "Hydration Moisturizer",
    price: "$28.00",
    oldPrice: "$40.00",
    discount: "30%",
    image: "https://via.placeholder.com/300x200",
    rating: 4,
    description: "Deep hydration for smooth, soft skin.",
    inStock: true,
  },
  {
    id: 7,
    name: "Rejuvenating Day Cream",
    price: "$16.50",
    oldPrice: "$33.00",
    discount: "50%",
    image: "https://via.placeholder.com/300x200",
    rating: 5,
    description: "Rejuvenates your skin for a youthful glow.",
    inStock: false,
  },
  {
    id: 8,
    name: "Lilac Fairness Serum",
    price: "$22.00",
    image: "https://via.placeholder.com/300x200",
    rating: 3,
    description: "A serum that enhances skin tone and fairness.",
    inStock: true,
  },
];*/
