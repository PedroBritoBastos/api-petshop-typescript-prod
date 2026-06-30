export interface ClientResponseDTO {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  cpf?: string | null;
  imageUrl: string | null;
}
