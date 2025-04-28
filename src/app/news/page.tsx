import { NewsCard } from "@/components/news-card";
import { Navbar } from '@/components/navbar';

export default function NewsPage() {
  const newsItems = [
    {
      id: "1",
      title: "Отремонтирована яма на улице Кулаковского",
      category: "Дорожные работы",
      subcategory: "яма",
      description: "Мы очень старались и 5 лет делали эту яму",
      date: "19.04.2025",
      imageUrl: "/pit.jpg",
    },
    {
      id: "2",
      title: "Отремонтирована яма на улице Кулаковского",
      category: "Дорожные работы",
      subcategory: "яма",
      description: "Мы очень старались и 5 лет делали эту яму",
      date: "18.04.2025",
      imageUrl: "/pit.jpg",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white" style={{ minHeight: "917px" }}>
      <Navbar />
      <div className="w-full">
        <h1 className="text-2xl font-bold p-4">Новости</h1>
        <div className="w-full">
          {newsItems.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}