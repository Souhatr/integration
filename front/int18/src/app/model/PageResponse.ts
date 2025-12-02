import { Lieu } from './Lieu';
export interface PageResponse {
  content: Lieu[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}