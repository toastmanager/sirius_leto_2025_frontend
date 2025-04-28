import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  date: string;
}

export const NewsCard = ({
  id,
  title,
  category,
  subcategory,
  description,
  date,
}: NewsCardProps) => {
  return (
    <Link href={`/news/${id}`} className="block mb-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src="/pit.jpg"
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-gray-500 text-sm">
                {category} → {subcategory}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-700">{description}</p>
          <span className="text-gray-400 text-xs">{date}</span>
        </div>
      </div>
    </Link>
  );
};