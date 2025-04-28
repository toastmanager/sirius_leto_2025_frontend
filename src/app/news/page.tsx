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
    },
    {
      id: "2",
      title: "Отремонтирована яма на улице Кулаковского",
      category: "Дорожные работы",
      subcategory: "яма",
      description: "Мы очень старались и 5 лет делали эту яму",
      date: "18.04.2025",
    },
  ];

  return (
    <div className="max-w-md mx-auto" style={{ width: "412px", height: "917px" }}>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Новости</h1>
        {newsItems.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}