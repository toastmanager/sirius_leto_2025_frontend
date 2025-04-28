'use client';
import Image from "next/image";
import { Navbar } from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';


export default function NewsDetailPage({ params }: { params: { id: string } }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();
    const newsItem = {
      id: params.id,
      title: "Яма на улице Кулаковского",
      date: "18.04.2005",
      content: "На улице Кулаковского находится яма прямо перед поворотом.",
      comment: "супер круто заделали яму мы молодцы)",
      images: [
        "/pit.jpg",
        "/karta.jpg",
        "/pit.jpg",
      ],
    };
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === newsItem.images.length - 1 ? 0 : prev + 1));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? newsItem.images.length - 1 : prev - 1));
    };
  
    return (
      <div className="w-full max-w-md mx-auto bg-white" style={{ minHeight: "917px" }}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="mb-4 text-xl font-bold mt-4">
          <ChevronLeft className="text-xl font-bold" />
          Заявка
        </Button>
        <div className="w-full">
          <div className="relative w-full h-64 overflow-hidden">
            {newsItem.images.map((img, index) => (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={img}
                  alt={`${newsItem.title} - фото ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}
            
            {/* Кнопки навигации слайдера */}
            {newsItem.images.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2"
                >
                  &lt;
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2"
                >
                  &gt;
                </button>
              </>
            )}
            
            {/* Индикаторы слайдов */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {newsItem.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </div>
  
          {/* Контент новости */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{newsItem.title}</h1>
            <p className="text-gray-500 text-sm mb-4">{newsItem.date}</p>
            <p className="text-base mb-4">{newsItem.content}</p>
            <p className="text-gray-500 text-sm italic">{newsItem.comment}</p>
          </div>
        </div>
        <Navbar />
      </div>
    );
  }