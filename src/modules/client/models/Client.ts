import { Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    cpf: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ClientModel = model("Client", clientSchema);
