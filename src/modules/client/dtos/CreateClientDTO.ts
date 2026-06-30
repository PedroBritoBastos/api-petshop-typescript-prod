export interface CreateClientDTO {
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  password: string;
  role: string;
}
