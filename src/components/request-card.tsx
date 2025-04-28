'use client';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Request } from '@/lib/types';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export function RequestCard({ request }: { request: Request }) {
  const statusColors = {
    'На рассмотрении': 'bg-yellow-100 text-yellow-800',
    'Отказано': 'bg-red-100 text-red-800',
    'Работы завершены': 'bg-green-100 text-green-800',
  };

  return (
    <Link href={`/requests/${request.id}`} className="block">
      <div className="p-4 border rounded-lg mb-4 hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-center mb-3">
          <Badge className={`${statusColors[request.status]} capitalize`}>
            {request.status}
          </Badge>
          <span className="text-sm text-gray-500">{request.date}</span>
        </div>

        <h3 className="font-semibold text-lg">{request.title}</h3>
        
        <div className="">
          <div className="flex items-start">
            <div className='flex'>
              <p className=" text-black-600">{request.problemType}</p>
              <span className="text-black-600 mr-2 ml-2 ">→</span>
              <p className="text-sm text-black-600 mt-0.5">{request.problemDescription}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-black-600 mb-3">
          {request.address}
        </p>

        {request.photos.length > 0 && (
          <div className="relative h-40 w-full rounded-lg overflow-hidden">
            <Image
              src={request.photos[0]}
              alt={`Фото заявки: ${request.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </Link>
  );
}