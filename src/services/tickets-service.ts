import api from "../lib/api-client";
import { CreateTicketInput } from "../lib/types/tickets/create-ticket-input";
import { PaginatedTickets } from "../lib/types/tickets/paginated-tickets";
import { Ticket, TicketStatus } from "../lib/types/tickets/ticket";

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

  statusToString(status: TicketStatus): string {
    switch (status) {
      case "PENDING_REVIEW":
        return "На рассмотрении";
      case "IN_PROGRESS":
        return "Работы ведутся";
      case "COMPLETED":
        return "Работы завершены";
      case "REJECTED":
        return "Отказано";
      default:
        const exhaustiveCheck: never = status;
        return exhaustiveCheck;
    }
  }

  statusToColorClass(status: TicketStatus): string {
    switch (status) {
      case "PENDING_REVIEW":
        return "bg-amber-300";
      case "IN_PROGRESS":
        return "bg-primary";
      case "COMPLETED":
        return "bg-secondary";
      case "REJECTED":
        return "bg-destructive";
      default:
        const exhaustiveCheck: never = status;
        return exhaustiveCheck;
    }
  }

  statusToBgColorClass(status: TicketStatus): string {
    switch (status) {
      case "PENDING_REVIEW":
        return "bg-amber-300/20";
      case "IN_PROGRESS":
        return "bg-primary/20";
      case "COMPLETED":
        return "bg-secondary/20";
      case "REJECTED":
        return "bg-destructive/20";
      default:
        const exhaustiveCheck: never = status;
        return exhaustiveCheck;
    }
  }
}

export default new TicketsService();
