import { RequestCard } from '@/components/request-card';
import { Navbar } from '@/components/navbar';
import { mockRequests } from '@/lib/mock-requests';

export default function RequestsPage() {
  return (
    <div className="pb-16">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6 mt-2 ml-1">Мои заявки</h1>
        
        {mockRequests.map(request => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
      <Navbar />
    </div>
  );
}