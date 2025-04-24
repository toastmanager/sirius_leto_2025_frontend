export type CreateTicketInput = {
  latitude: number;
  longitude: number;
  title: string;
  description?: string;
  typeId: number;
};
