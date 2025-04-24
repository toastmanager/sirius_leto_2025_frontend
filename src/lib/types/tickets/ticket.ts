import { TicketType } from "./ticket-type";
import { User } from "../auth/user";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  created_at: Date;
  latitude: number;
  longitude: number;
  user: User;
  type: TicketType;
};
