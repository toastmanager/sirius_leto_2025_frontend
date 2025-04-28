import { ArticleCard } from "@/components/news-card";
import { Navbar } from "@/components/navbar";
import newsService from "../../services/news-service";

export default async function NewsPage() {
  const articles = (await newsService.getArticles()).results;

  return (
    <div
      className="w-full max-w-md mx-auto bg-white"
      style={{ minHeight: "917px" }}
    >
      <Navbar />
      <div className="w-full">
        <h1 className="text-2xl font-bold p-4">Новости</h1>
        <div className="w-full">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
