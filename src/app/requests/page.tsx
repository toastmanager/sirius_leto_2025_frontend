"use client";

import { TicketCard } from "@/components/ticket-card";
import { Navbar } from "@/components/navbar";
import { useAuth } from "../../context/auth-context";
import Spinner from "../../components/spinner";
import { useEffect, useState } from "react";
import ticketsService from "../../services/tickets-service";
import { Ticket } from "../../lib/types/tickets/ticket";
import { Separator } from "../../components/ui/separator";

export default function TicketsPage() {
  const { isLoading, user } = useAuth();
  const [ticketsList, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    const tickets = await ticketsService.getTickets();
    setTickets(tickets.results);
  };

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  return (
    <div className="pb-16">
      <div className="py-4">
        <h1 className="pl-4 text-xl font-bold mb-6 mt-2 ml-1">Мои заявки</h1>
        {isLoading && (
          <div className="flex h-[calc(100vh-160px)]">
            <Spinner className="m-auto" />
          </div>
        )}
        {!user ? (
          <div className="flex h-[calc(100vh-160px)]">
            <h1 className="m-auto font-medium">
              Вы не авторизованы. Пожалуйста, войдите в аккаунт
            </h1>
          </div>
        ) : (
          <>
            {ticketsList.map((ticket) => (
              <div key={ticket.id}>
                <TicketCard ticket={ticket} />
                <Separator className="my-4" />
              </div>
            ))}
          </>
        )}
      </div>
      <Navbar />
    </div>
  );
}
