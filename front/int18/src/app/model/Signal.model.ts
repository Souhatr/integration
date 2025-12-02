export class Signal {
  id?: number;
  idU?: number;
  // match backend: 'category' is an object { idC, name }
  category?: { idC?: number; name?: string } | null;
  description?: string;
  dateReported?: Date;
  status?: string;
}
