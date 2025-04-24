import api from "../lib/api-client";
import { CreateTicketInput } from "../lib/types/tickets/create-ticket-input";
import { PaginatedTickets } from "../lib/types/tickets/paginated-tickets";
import { Ticket } from "../lib/types/tickets/ticket";

class TicketsService {
  async createTicket(input: CreateTicketInput) {
    const ticket: Ticket = (await api.post("tickets/", input)).data;
    return ticket;
  }

  async getTickets(): Promise<PaginatedTickets> {
    const tickets: PaginatedTickets = (await api.get(`tickets/`)).data;
    return tickets;
  }

  async getTicketDetails(id: number): Promise<Ticket> {
    const ticket: Ticket = (await api.get(`tickets/${id}/`)).data;
    return ticket;
  }
}

export default new TicketsService();
