
export interface PlageHoraire {
  id: number;
  jour: string;
  heureDebut: string; // ISO time or string
  heureFin: string;
  actif?: boolean;
}

export interface Lieu {
  idL: number;
  nom: string;
  description: string;
  adresse: string;
  categorie: string;
  tarif: number;
  idImage: number;
  disponible: boolean;
  plagesHoraires: PlageHoraire[];
}