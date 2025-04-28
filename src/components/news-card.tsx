import Link from "next/link";
import Image from "next/image";

interface NewsCardProps {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  date: string;
  imageUrl: string;
}

export const NewsCard = ({
  id,
  title,
  category,
  subcategory,
  description,
  date,
  imageUrl,
}: NewsCardProps) => {
  return (
    <Link href={`/news/${id}`} className="block w-full border-b border-gray-200 pb-4 mb-4 last:border-0">
      <div className="w-full h-48 relative mb-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      <div className="w-full px-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm mb-2">
          {category} → {subcategory}
        </p>
        <p className="text-gray-700 mb-1">{description}</p>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
    </Link>
  );
};