import { Schema, model } from "mongoose";

const petSchema = new Schema(
  {
    clientId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    isAdopted: {
      type: Boolean,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    adoptionClientId: {
      type: String,
    },

    adoptionStatus: {
      type: String,
      default: "available",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PetModel = model("Pet", petSchema);
