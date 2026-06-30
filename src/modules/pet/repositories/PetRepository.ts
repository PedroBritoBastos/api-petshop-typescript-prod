import { prisma } from "../../../shared/prisma/prisma";
import { Pet } from "../../../generated/prisma/client";
import { IPetRepository } from "./IPetRepository";
import { CreatePetDTO } from "../dtos/CreatePetDTO";
import { UpdatePetDTO } from "../dtos/UpdatePetDTO";

export class PetRepository implements IPetRepository {
  async create(data: CreatePetDTO): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });
    return pet;
  }

  async deleteById(id: string): Promise<Pet> {
    const deletedPet = await prisma.pet.delete({
      where: { id },
    });
    return deletedPet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });
    return pet;
  }

  async getAll(): Promise<Pet[]> {
    return await prisma.pet.findMany();
  }

  async update(id: string, data: UpdatePetDTO): Promise<Pet> {
    const updatedPet = await prisma.pet.update({
      where: { id },
      data,
    });

    return updatedPet;
  }

  async findByIsAdopted(): Promise<Pet[] | null> {
    return await prisma.pet.findMany({
      where: {
        isAdopted: true,
      },
    });
  }

  async findByNotAdopted(): Promise<Pet[] | null> {
    return await prisma.pet.findMany({
      where: {
        isAdopted: false,
      },
    });
  }

  async findByIsAdoptedByClientId(clientId: string): Promise<Pet[] | null> {
    return await prisma.pet.findMany({
      where: {
        adoptionClientId: clientId,
        isAdopted: true,
      },
    });
  }
}
