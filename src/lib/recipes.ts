export interface Recipe {
  key: string;
  title: string;
  thumb: string;
  times: string;
  portion: string;
  dificulty: string;
  category: string;
}

const INDONESIAN_RECIPES: Recipe[] = [
  {
    key: "1",
    title: "Rendang Sapi Padang",
    thumb: "https://i.pinimg.com/736x/8c/24/9f/8c249f1c5a07371b5ae0f36fe7a13692.jpg",
    times: "4 Jam",
    portion: "4 Porsi",
    dificulty: "Sulit",
    category: "Main Course"
  },
  {
    key: "2",
    title: "Sate Ayam Madura",
    thumb: "https://i.pinimg.com/1200x/8a/0b/b9/8a0bb90c9124817be2045da8a4c4e98e.jpg",
    times: "45 mnt",
    portion: "2 Porsi",
    dificulty: "Sedang",
    category: "Grill"
  },
  {
    key: "3",
    title: "Nasi Goreng Spesial",
    thumb: "https://images.unsplash.com/photo-1603088549155-6ae9395b928f?q=80&w=800&auto=format&fit=crop",
    times: "20 mnt",
    portion: "1 Porsi",
    dificulty: "Mudah",
    category: "Breakfast"
  },
  {
    key: "4",
    title: "Gado-Gado Jakarta",
    thumb: "https://i.pinimg.com/736x/1f/7d/0b/1f7d0bda30cd9c7646c374bb20f33c2a.jpg",
    times: "30 mnt",
    portion: "2 Porsi",
    dificulty: "Mudah",
    category: "Salad"
  },
  {
    key: "5",
    title: "Soto Ayam Lamongan",
    thumb: "https://i.pinimg.com/1200x/4e/f4/ec/4ef4ec32cfa71c4cfbae335e84ce2b80.jpg",
    times: "60 mnt",
    portion: "3 Porsi",
    dificulty: "Sedang",
    category: "Soup"
  },
  {
    key: "6",
    title: "Bakso Urat Solo",
    thumb: "https://i.pinimg.com/736x/37/52/46/375246e70dce784390fe5ec48b9168c7.jpg",
    times: "90 mnt",
    portion: "4 Porsi",
    dificulty: "Sedang",
    category: "Soup"
  },
  {
    key: "7",
    title: "Nasi Tumpeng Kuning",
    thumb: "https://i.pinimg.com/1200x/61/00/01/6100014a2a5d5f86eec4f62fdaef055f.jpg",
    times: "120 mnt",
    portion: "10 Porsi",
    dificulty: "Sulit",
    category: "Ceremony"
  },
  {
    key: "8",
    title: "Pempek Palembang",
    thumb: "https://i.pinimg.com/736x/cb/ab/36/cbab3668111326924649e6214dae92e1.jpg",
    times: "60 mnt",
    portion: "5 Porsi",
    dificulty: "Sedang",
    category: "Snack"
  },
  {
    key: "9",
    title: "Martabak Manis",
    thumb: "https://i.pinimg.com/736x/9a/fb/0b/9afb0b09893a6d214f24e018fd448d20.jpg",
    times: "25 mnt",
    portion: "4 Porsi",
    dificulty: "Mudah",
    category: "Dessert"
  },
  {
    key: "10",
    title: "Ayam Betutu Bali",
    thumb: "https://i.pinimg.com/736x/7b/d4/7e/7bd47ea0ce92314b5e61681e6c62baa5.jpg",
    times: "3 Jam",
    portion: "6 Porsi",
    dificulty: "Sulit",
    category: "Main Course"
  },
];

export default INDONESIAN_RECIPES;