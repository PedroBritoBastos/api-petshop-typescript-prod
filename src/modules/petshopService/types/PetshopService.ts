export interface PetshopService {
  id: string;
  clientId: string;
  petId: string;
  type: string;
  executionDate: Date;
  finished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
