export interface Pet {
  name: string;
  age: number;
  weight: number;
  id: string;
  clientId: string;
  isAdopted: boolean;
  imageUrl: string;
  adoptionClientId: string | null;
  adoptionStatus: string;
  createdAt: Date;
  updatedAt: Date;
}
