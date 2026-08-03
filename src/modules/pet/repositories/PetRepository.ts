import { PetModel } from "../models/Pet";
import { Pet } from "../types/Pet";
import { IPetRepository } from "./IPetRepository";
import { CreatePetDTO } from "../dtos/CreatePetDTO";
import { UpdatePetDTO } from "../dtos/UpdatePetDTO";

export class PetRepository implements IPetRepository {
  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = await PetModel.create(data);

    return {
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    };
  }

  async deleteById(id: string): Promise<Pet | null> {
    const pet = await PetModel.findByIdAndDelete(id).lean();

    if (!pet) return null;

    return {
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    };
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await PetModel.findById(id).lean();

    if (!pet) return null;

    return {
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    };
  }

  async getAll(): Promise<Pet[]> {
    const pets = await PetModel.find().lean();

    return pets.map((pet) => ({
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    }));
  }

  async update(id: string, data: UpdatePetDTO): Promise<Pet | null> {
    const pet = await PetModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    if (!pet) return null;

    return {
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    };
  }

  async findByIsAdopted(): Promise<Pet[] | null> {
    const pets = await PetModel.find({
      isAdopted: true,
    }).lean();

    return pets.map((pet) => ({
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    }));
  }

  async findByNotAdopted(): Promise<Pet[] | null> {
    const pets = await PetModel.find({
      isAdopted: false,
      adoptionStatus: "available",
    }).lean();

    return pets.map((pet) => ({
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    }));
  }

  async findByIsAdoptedByClientId(clientId: string): Promise<Pet[] | null> {
    const pets = await PetModel.find({
      adoptionClientId: clientId,
    }).lean();

    return pets.map((pet) => ({
      id: pet._id.toString(),
      clientId: pet.clientId,
      name: pet.name,
      age: pet.age,
      weight: pet.weight,
      isAdopted: pet.isAdopted,
      imageUrl: pet.imageUrl,
      adoptionClientId: pet.adoptionClientId as string,
      adoptionStatus: pet.adoptionStatus,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      breed: pet.breed,
    }));
  }
}
