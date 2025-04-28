'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { Request } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  const request: Request = {
    id: params.id,
    status: 'На рассмотрении',
    title: 'Яма на улице Кулаковского',
    problemType: 'Дорожные работы',
    problemDescription: 'Яма',
    address: 'ул. Кулаковского',
    comment: 'На улице Кулаковского находится она прямо перед поворотом.',
    photos: ['/pit.jpg', '/karta.jpg'],
    date: '28.04.2025'
  };
  const statusColors = {
    'На рассмотрении': 'bg-yellow-100 text-yellow-800',
    'Отказано': 'bg-red-100 text-red-800',
    'Работы завершены': 'bg-green-100 text-green-800',
  };
  return (
    <div className="pb-16">
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
        
        <div className="flex justify-between items-center mb-3">
          <Badge className={`${statusColors[request.status]} capitalize`}>
            {request.status}
          </Badge>
          <span className="text-sm text-gray-500">{request.date}</span>
        </div>

        <h1 className="text-xl font-bold">{request.title}</h1>

        <div className="">
          <div className="flex items-start">
            <div className='flex'>
              <p className="font-medium">{request.problemType}</p>
              <span className="text-black-500 mr-2 ml-2">→</span>
              <p className="text-black-600 ">{request.problemDescription}</p>
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-black-600 mb-2">{request.address}</p>
        </div>

        <div className="mb-6">
          <div className="relative h-64 w-full bg-gray-100 rounded-lg overflow-hidden mb-2">
            <Image
              src={request.photos[0]}
              alt="Фото заявки"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            {request.photos.map((photo, index) => (
              <div key={index} className="flex-shrink-0 relative h-16 w-16 rounded-md overflow-hidden border">
                <Image
                  src={photo}
                  alt={`Фото ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          {request.comment && (
          <div className="mt-2">
            <p className="font-medium">Комментарий</p>
            <p className="text-gray-600">{request.comment}</p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}