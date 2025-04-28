'use client';
import Image from "next/image";
import Link from "next/link";
import { Navbar } from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function NewsDetailPage({ params }: { params: { id: string } }) {

  const newsItem = {
    id: params.id,
    title: "Яма на улице Кулаковского",
    date: "18.04.2005",
    description: "На улице Кулаковского находится яма прямо перед поворотом.",
    comment: "супер круто заделали яму мы молодцы)",
  };
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto" style={{ width: "412px", height: "917px" }}>
      <Navbar />
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="mb-4 text-xl font-bold"
        >
          <ChevronLeft className="text-xl font-bold" />
          Заявка
        </Button>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h1 className="text-2xl font-bold mb-2">{newsItem.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{newsItem.date}</p>
          
          <div className="mb-4">
            <Image
              src="/pit.jpg"
              alt="Яма на улице Кулаковского"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          
          <p className="mb-4">{newsItem.description}</p>
          <p className="text-gray-500 italic">{newsItem.comment}</p>
        </div>
      </div>
    </div>
  );
}