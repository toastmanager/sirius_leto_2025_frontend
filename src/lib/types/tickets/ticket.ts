import { TicketType } from "./ticket-type";
import { User } from "../auth/user";

export type TicketStatus =
  | "PENDING_REVIEW"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  latitude: number;
  longitude: number;
  user: User;
  type: TicketType;
  status: TicketStatus;
};
