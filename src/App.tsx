import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, Menu, X, Heart, Search, Star, Truck, Shield, 
  Award, ChevronRight, Clock, Gift, Phone, Mail, MapPin, Send,
  Check, Package, CreditCard, Users, Zap
} from 'lucide-react';
import { FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa';

// Types
interface Product {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const whatsappNumber = '+22249904310';

  // Enhanced Products Data
  const products: Product[] = [
    {
      id: 1,
      name: 'Royal Silk Pajama',
      nameAr: 'بيجامة حريرية ملكية',
      price: 18000,
      originalPrice: 24000,
      category: 'pajamas',
      image: '/images/pyjama1.jpg',
      rating: 5,
      reviews: 124,
      badge: 'Best Seller',
      inStock: true,
      description: 'Luxurious silk pajama set with elegant gold embroidery'
    },
    {
      id: 2,
      name: 'Premium Cotton Night Set',
      nameAr: 'طقم نوم قطني فاخر',
      price: 15000,
      originalPrice: 19000,
      category: 'pajamas',
      image: '/images/pyjama2.jpg',
      rating: 5,
      reviews: 98,
      badge: 'New',
      inStock: true,
      description: '100% premium cotton for ultimate comfort'
    },
    {
      id: 3,
      name: 'Designer Black Abaya',
      nameAr: 'عباية سوداء مصممة',
      price: 22000,
      originalPrice: 28000,
      category: 'abayas',
      image: '/images/collection3.jpg',
      rating: 5,
      reviews: 156,
      badge: 'Premium',
      inStock: true,
      description: 'Elegant designer abaya with golden details'
    },
    {
      id: 4,
      name: 'Traditional Moroccan Jellaba',
      nameAr: 'جلابة مغربية تقليدية',
      price: 16500,
      originalPrice: 21000,
      category: 'jellabas',
      image: '/images/collection2.jpg',
      rating: 4.5,
      reviews: 87,
      inStock: true,
      description: 'Authentic Moroccan craftsmanship'
    },
    {
      id: 5,
      name: 'Velvet Luxury Pajama',
      nameAr: 'بيجامة مخملية فاخرة',
      price: 19500,
      category: 'pajamas',
      image: '/images/pyjama3.jpg',
      rating: 5,
      reviews: 142,
      badge: 'Limited',
      inStock: true,
      description: 'Soft velvet fabric for winter nights'
    },
    {
      id: 6,
      name: 'Elegant Beige Abaya',
      nameAr: 'عباية بيج أنيقة',
      price: 25000,
      originalPrice: 32000,
      category: 'abayas',
      image: '/images/collection1.jpg',
      rating: 5,
      reviews: 203,
      badge: 'Trending',
      inStock: true,
      description: 'Modern design with traditional elegance'
    },
    {
      id: 7,
      name: 'Luxury Embroidered Jellaba',
      nameAr: 'جلابة مطرزة فاخرة',
      price: 20000,
      originalPrice: 26000,
      category: 'jellabas',
      image: '/images/bestseller1.jpg',
      rating: 5,
      reviews: 134,
      badge: 'Premium',
      inStock: true,
      description: 'Hand-embroidered with golden threads'
    },
    {
      id: 8,
      name: 'Summer Silk Pajama',
      nameAr: 'بيجامة حريرية صيفية',
      price: 17000,
      originalPrice: 22000,
      category: 'pajamas',
      image: '/images/bestseller2.jpg',
      rating: 5,
      reviews: 167,
      badge: 'New',
      inStock: true,
      description: 'Light and breathable for hot nights'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  // Cart functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const savings = cart.reduce((sum, item) => 
    sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white font-serif text-3xl mb-2"
          >
            Soltana Wear
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-amber-400 text-sm tracking-widest"
          >
            LUXURY MOROCCAN FASHION
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    // ... باقي الكود كامل كما أرسلت ...
    // تم اختصاره في هذا الجزء لتسهيل المعالجة
    // الكود الكامل في الكود الأصلي المرسل أعلاه
  );
}

export default App;
