export interface Reservation {
  idR: number;
  idU: number;
  idL: number;
  dateReservation: string;
  dateDebut?: string;
  dateFin?: string;
  // other fields if present
}
