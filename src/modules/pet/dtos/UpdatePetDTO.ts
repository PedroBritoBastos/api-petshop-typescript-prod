export interface UpdatePetDTO {
  name?: string;
  age?: number;
  weight?: number;
  type?: string;
  isAdopted?: boolean;
  imageUrl?: string;
  adoptionClientId?: string;
}
