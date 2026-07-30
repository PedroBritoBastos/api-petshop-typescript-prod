import { Schema, model } from "mongoose";

const petshopServiceSchema = new Schema(
  {
    clientId: {
      type: String,
      required: true,
    },

    petId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    executionDate: {
      type: Date,
      required: true,
    },

    finished: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PetshopServiceModel = model("PetshopService", petshopServiceSchema);
