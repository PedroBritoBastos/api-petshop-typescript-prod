import { IPetshopServiceRepository } from "./IPetshopServiceRepository";
import { CreatePetshopServiceDTO } from "../dtos/CreatePetshopServiceDTO";
import { UpdatePetshopServiceDTO } from "../dtos/UpdatePetshopServiceDTO";
import { PetshopService } from "../types/PetshopService";
import { PetshopServiceModel } from "../models/PetshopService";

export class PetshopServiceRepository implements IPetshopServiceRepository {
  async create(data: CreatePetshopServiceDTO): Promise<PetshopService> {
    const petshopService = await PetshopServiceModel.create(data);

    return {
      id: petshopService._id.toString(),
      clientId: petshopService.clientId,
      petId: petshopService.petId,
      type: petshopService.type,
      executionDate: petshopService.executionDate,
      finished: petshopService.finished,
      createdAt: petshopService.createdAt,
      updatedAt: petshopService.updatedAt,
    };
  }

  async getAll(): Promise<PetshopService[]> {
    const petshopServices = await PetshopServiceModel.find().lean();

    return petshopServices.map((petshopService) => ({
      id: petshopService._id.toString(),
      clientId: petshopService.clientId,
      petId: petshopService.petId,
      type: petshopService.type,
      executionDate: petshopService.executionDate,
      finished: petshopService.finished,
      createdAt: petshopService.createdAt,
      updatedAt: petshopService.updatedAt,
    }));
  }

  async getById(id: string): Promise<PetshopService | null> {
    const petshopService = await PetshopServiceModel.findById(id).lean();

    if (!petshopService) return null;

    return {
      id: petshopService._id.toString(),
      clientId: petshopService.clientId,
      petId: petshopService.petId,
      type: petshopService.type,
      executionDate: petshopService.executionDate,
      finished: petshopService.finished,
      createdAt: petshopService.createdAt,
      updatedAt: petshopService.updatedAt,
    };
  }

  async deleteById(id: string): Promise<PetshopService | null> {
    const petshopService = await PetshopServiceModel.findByIdAndDelete(id).lean();

    if (!petshopService) return null;

    return {
      id: petshopService._id.toString(),
      clientId: petshopService.clientId,
      petId: petshopService.petId,
      type: petshopService.type,
      executionDate: petshopService.executionDate,
      finished: petshopService.finished,
      createdAt: petshopService.createdAt,
      updatedAt: petshopService.updatedAt,
    };
  }

  async update(id: string, data: UpdatePetshopServiceDTO): Promise<PetshopService | null> {
    const petshopService = await PetshopServiceModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    if (!petshopService) return null;

    return {
      id: petshopService._id.toString(),
      clientId: petshopService.clientId,
      petId: petshopService.petId,
      type: petshopService.type,
      executionDate: petshopService.executionDate,
      finished: petshopService.finished,
      createdAt: petshopService.createdAt,
      updatedAt: petshopService.updatedAt,
    };
  }

  async getByClientId(clientId: string): Promise<PetshopService[] | null> {
    const petshopServices = await PetshopServiceModel.find({
      clientId,
    }).lean();

    return petshopServices.map((petshopService) => ({
      id: petshopService._id.toString(),
      clientId: petshopService.clientId,
      petId: petshopService.petId,
      type: petshopService.type,
      executionDate: petshopService.executionDate,
      finished: petshopService.finished,
      createdAt: petshopService.createdAt,
      updatedAt: petshopService.updatedAt,
    }));
  }
}
